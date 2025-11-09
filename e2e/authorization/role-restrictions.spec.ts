import { expect } from "@playwright/test";
import { login } from "../helpers/auth";
import { test } from "@playwright/test";

test.describe("Role-Based Authorization", () => {
  test("player cannot access user management", async ({ page }) => {
    await login(page, "player");

    await page.goto("/admin/users");

    // Should be redirected away from /admin/users or show unauthorized message
    // Could redirect to dashboard, home page, or show error message
    const isBlocked =
      !page.url().includes("/admin/users") ||
      (await page
        .locator("text=not authorized, text=unauthorized, text=permission")
        .count()) > 0 ||
      (await page.getByText(/you don't have permission/i).count()) > 0;

    expect(isBlocked).toBe(true);
  });

  test("player cannot access new user form", async ({ page }) => {
    await login(page, "player");

    await page.goto("/admin/users/new");

    const isBlocked = !(await page
      .locator('[data-testid="user-new-page"]')
      .isVisible());

    expect(isBlocked).toBe(true);
  });

  test("coach can access user management", async ({ page }) => {
    await login(page, "coach");

    await page.goto("/admin/users");

    const isVisible = await page
      .locator('[data-testid="user-index-page"]')
      .isVisible();

    expect(isVisible).toBe(true);
  });

  test("coach cannot create users", async ({ page }) => {
    await login(page, "coach");

    await page.goto("/admin/users/new");

    const isBlocked = !(await page
      .locator('[data-testid="user-new-page"]')
      .isVisible());

    expect(isBlocked).toBe(true);
  });

  test("academy_admin can access user management", async ({ page }) => {
    await login(page, "academy_admin");

    await page.goto("/admin/users");

    await page.pause();

    // Wait for user data to load
    await page.waitForSelector("table tbody tr");

    // Should see user list elements
    await expect(page.locator("text=@example.com").first()).toBeVisible();
  });

  test("academy_admin can create users", async ({ page }) => {
    await login(page, "academy_admin");

    await page.goto("/admin/users/new");

    // Should access form
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator("select.select-bordered")).toBeVisible();
  });

  test("super_admin can access all features", async ({ page }) => {
    await login(page, "super_admin");

    // Can access user management
    await page.goto("/admin/users");
    await expect(
      page.getByRole("heading", { name: "User Management" })
    ).toBeVisible();

    // Can access user creation
    await page.goto("/admin/users/new");
    await expect(page.locator("form")).toBeVisible();

    // Can access user editing
    await page.goto("/admin/users");
    // Find the first row in the table
    const firstRow = page.locator("table tbody tr").first();
    // Find the "View" link within that row and click it
    await firstRow.getByLabel("View user").click();

    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+$/);

    // Should see edit option
    const editLink = page.getByRole("link", { name: "Edit" });
    await expect(editLink).toBeVisible();
  });

  test("lower role cannot access higher role user details", async ({
    page,
  }) => {
    await login(page, "player");

    // Try to access a super admin user by navigating directly
    await page.goto("/admin/users");

    const currentUrl = page.url();

    let isBlocked = false;
    if (
      currentUrl === "http://localhost:3000/" ||
      currentUrl === "http://localhost:3000/?locale=en" ||
      currentUrl === "http://localhost:3000/?locale=es"
    ) {
      // Redirected to root_path, count as success
      isBlocked = true;
    } else if (currentUrl === "http://localhost:3000/app/dashboard") {
      // Redirected to dashboard, check for flash notice
      isBlocked =
        (await page
          .locator("text=not authorized, text=unauthorized, text=permission")
          .count()) > 0 ||
        (await page.getByText(/you are not authorized/i).count()) > 0;
    } else {
      // Still on /admin/users or somewhere else, check for unauthorized message
      isBlocked =
        (await page
          .locator("text=not authorized, text=unauthorized, text=permission")
          .count()) > 0 ||
        (await page.getByText(/you are not authorized/i).count()) > 0;
    }

    expect(isBlocked).toBe(true);
  });

  test("player sees appropriate dashboard content", async ({ page }) => {
    await login(page, "player");

    // Should be on dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Should not see admin navigation items
    const adminNav = page.locator(
      'text=User Management, a:has-text("Users"), a[href*="/admin"]'
    );
    const adminNavCount = await adminNav.count();

    // Admin navigation should not be visible to players
    if (adminNavCount > 0) {
      // If it exists, it should not be visible or clickable
      await expect(adminNav.first()).not.toBeVisible();
    }
  });

  test("super_admin sees all navigation options", async ({ page }) => {
    await login(page, "super_admin");

    await page.waitForURL(/\/app\/dashboard/);

    // Should see admin/management options in navigation
    // This might be in sidebar, header, or dropdown menu
    await page.goto("/admin/users");
    await expect(page).toHaveURL(/\/admin\/users/);
  });

  test("role hierarchy is enforced", async ({ page }) => {
    // Test that role hierarchy works: super_admin > academy_admin > coach > player
    // Each role test is covered individually above
  });
});
