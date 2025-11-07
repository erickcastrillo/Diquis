import { Page } from "@playwright/test";

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

  // Wait for navigation to complete
  await Promise.all([
    page.waitForURL(/\/app\/dashboard/, { timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);
}

export async function logout(page: Page) {
  await page.click(
    '[data-testid="profile-menu"], .dropdown-toggle:has-text("Profile")'
  );
  await page.click('text=Logout, a[href*="sign_out"]');
  await page.waitForURL(/\/(users\/sign_in|\/)/);
}

export async function isLoggedIn(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector(
      '[data-testid="profile-menu"], a:has-text("Logout")',
      {
        timeout: 2000,
      }
    );
    return true;
  } catch {
    return false;
  }
}
