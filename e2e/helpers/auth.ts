import { expect, Page } from "@playwright/test";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const TEST_USERS = {
  super_admin: {
    email: "admin@diquis.com",
    password: "Dev3l0pment!2025",
  },
  academy_admin: {
    email: "academy@diquis.com",
    password: "Dev3l0pment!2025",
  },
  coach: {
    email: "coach@diquis.com",
    password: "Dev3l0pment!2025",
  },
  player: {
    email: "player@diquis.com",
    password: "Dev3l0pment!2025",
  },
} as const;

export async function login(
  page: Page,
  credentials: LoginCredentials | keyof typeof TEST_USERS
) {
  const creds =
    typeof credentials === "string" ? TEST_USERS[credentials] : credentials;

  // Navigate to sign in page
  await page.goto("/users/sign_in");

  // Wait for the page to settle
  await page.waitForLoadState("networkidle");

  // Check if redirected to dashboard (already logged in)
  if (page.url().includes("/app/dashboard") || page.url().includes("/app/")) {
    // Already logged in - just return
    return;
  }

  // Wait for form to be fully loaded
  await page.waitForSelector('input[type="email"]', {
    state: "visible",
    timeout: 10000,
  });
  await page.waitForSelector('button[type="submit"]:not([disabled])', {
    state: "visible",
    timeout: 10000,
  });

  await page.fill('input[type="email"]', creds.email);
  await page.fill('input[type="password"]', creds.password);

  // Click the submit button and wait for navigation to complete
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/app\/dashboard/, { timeout: 30000 });
}

/**
 * Opens the profile dropdown menu
 * This helper ensures FlyonUI has initialized before clicking
 */
export async function openProfileMenu(page: Page) {
  const profileButton = page.locator("#profile-menu-button");
  const signOutLink = page.locator("#sign-out-link");

  // Use expect.poll to retry opening the menu until the sign out link is visible.
  // This is much more robust than a fixed timeout.
  await expect
    .poll(
      async () => {
        if (!(await profileButton.isVisible())) {
          return false;
        }
        await profileButton.click();
        return await signOutLink.isVisible();
      },
      {
        message: "The profile dropdown menu did not open after multiple attempts.",
        timeout: 10000, // Total time to keep retrying
      }
    )
    .toBe(true);
}

export async function logout(page: Page) {
  // Wait for a reliable element from the authenticated layout to be visible
  await page.waitForSelector("#profile-menu-button", {
    state: "visible",
    timeout: 15000,
  });

  // Wait for the network to be idle, ensuring all scripts and assets are loaded
  await page.waitForLoadState("networkidle");

  // Wait for the CSRF token meta tag to be attached to the DOM
  await page.waitForSelector('meta[name="csrf-token"]', { state: 'attached', timeout: 10000 });

  // Use page.evaluate to get the CSRF token directly from the DOM.
  const csrfToken = await page.evaluate(() => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    return tokenElement ? tokenElement.getAttribute("content") : null;
  });

  if (!csrfToken) {
    throw new Error(
      "CSRF token not found on the page using page.evaluate."
    );
  }

  // Send a POST request to the logout path with _method set to 'delete'
  await page.request.post("/users/sign_out", {
    form: {
      _method: "delete",
      authenticity_token: csrfToken,
    },
  });

  // Wait for redirect to login page
  await page.waitForURL(/\/(users\/sign_in|\/)/, { timeout: 15000 });
}

export async function isLoggedIn(page: Page): Promise<boolean> {
  try {
    // Check if the profile menu button is visible
    await page.waitForSelector("#profile-menu-button", {
      timeout: 2000,
    });
    return true;
  } catch {
    return false;
  }
}
