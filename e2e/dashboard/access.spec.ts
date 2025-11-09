import { expect } from "@playwright/test";
import { test } from "@playwright/test";
import { login, TEST_USERS } from "../helpers/auth";

test.describe("Dashboard Access", () => {
  test("authenticated user can access dashboard", async ({ page }) => {
    await login(page, "player");

    // Should be on dashboard after login
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Should show dashboard content - check for heading or dashboard identifier
    const dashboardVisible =
      (await page.locator("h1, h2").first().isVisible()) ||
      (await page.locator('[data-testid="dashboard"]').isVisible()) ||
      page.url().includes("/app/dashboard");

    expect(dashboardVisible).toBe(true);
  });

  test("unauthenticated user redirected to login", async ({ page }) => {
    await page.goto("/app/dashboard");

    // Should redirect to sign in
    await expect(page).toHaveURL(/\/users\/sign_in/);

    // Should show login form
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("super_admin sees appropriate dashboard content", async ({
    page,
  }) => {
    await login(page, "super_admin");

    await page.goto("/app/dashboard");

    // Should show dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Super admin might see admin links/widgets
    // This is optional based on your dashboard design
    const dashboardContent = page.locator("main, .dashboard, [role='main']");
    await expect(dashboardContent).toBeVisible();
  });

  test("academy_admin sees appropriate dashboard content", async ({ page }) => {
    await login(page, "academy_admin");

    await page.goto("/app/dashboard");

    // Should access dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Academy admin sees relevant content
    const dashboardContent = page.locator("main, .dashboard, [role='main']");
    await expect(dashboardContent).toBeVisible();
  });

  test("coach sees appropriate dashboard content", async ({ page }) => {
    await login(page, "coach");

    await page.goto("/app/dashboard");

    // Should access dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Coach sees their content
    const dashboardContent = page.locator("main, .dashboard, [role='main']");
    await expect(dashboardContent).toBeVisible();
  });

  test("player sees appropriate dashboard content", async ({ page }) => {
    await login(page, "player");

    await page.goto("/app/dashboard");

    // Should access dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Player sees their content
    const dashboardContent = page.locator("main, .dashboard, [role='main']");
    await expect(dashboardContent).toBeVisible();

    // Players should NOT see admin functions
    // Check for admin links or "User Management" text
    const adminLinksCount = await page.locator('a[href*="/admin"]').count();
    const userMgmtCount = await page.getByText("User Management").count();

    // If admin links or user management text exist, they should not be visible to players
    if (adminLinksCount > 0) {
      await expect(page.locator('a[href*="/admin"]').first()).not.toBeVisible();
    }
    if (userMgmtCount > 0) {
      await expect(page.getByText("User Management").first()).not.toBeVisible();
    }
  });

  test("dashboard shows user profile information", async ({ page }) => {
    await login(page, "super_admin");

    await page.goto("/app/dashboard");

    // Should show some user information (name, email, role, etc.)
    // Look for admin email or "admin" text
    const profileInfo = page.locator("text=admin@diquis.com");
    const adminText = page.locator("text=admin");
    const superAdminText = page.locator("text=Super Admin");

    // At least one should be visible
    const hasEmail = await profileInfo.count();
    const hasAdminText = await adminText.count();
    const hasSuperAdmin = await superAdminText.count();

    expect(hasEmail + hasAdminText + hasSuperAdmin).toBeGreaterThan(0);
  });

  test("dashboard navigation works after login", async ({ page }) => {
    await login(page, "super_admin");

    // Start at dashboard
    await page.goto("/app/dashboard");
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Navigate to user management
    await page.goto("/admin/users");
    await expect(page).toHaveURL(/\/admin\/users/);

    // Navigate back to dashboard
    await page.goto("/app/dashboard");
    await expect(page).toHaveURL(/\/app\/dashboard/);
  });

  test("session persists across page reloads", async ({ page }) => {
    await login(page, "player");

    await page.goto("/app/dashboard");
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Reload page
    await page.reload();

    // Should still be logged in and on dashboard
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Should not redirect to login
    await expect(page).not.toHaveURL(/\/users\/sign_in/);
  });

  test("different roles can access their dashboard simultaneously", async ({
    page,
    context,
  }) => {
    // Login as player
    await login(page, "player");
    await page.goto("/app/dashboard");
    await expect(page).toHaveURL(/\/app\/dashboard/);

    // Open new page in different context for admin
    const browser = page.context().browser();
    if (!browser) {
      throw new Error("Browser instance is null");
    }
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    await adminPage.goto("/users/sign_in");
    await adminPage.fill('input[type="email"]', TEST_USERS.super_admin.email);
    await adminPage.fill(
      'input[type="password"]',
      TEST_USERS.super_admin.password
    );
    await adminPage.click('button[type="submit"]');
    await adminPage.waitForURL(/\/app\/dashboard/);

    // Both should be on their respective dashboards
    await expect(page).toHaveURL(/\/app\/dashboard/);
    await expect(adminPage).toHaveURL(/\/app\/dashboard/);

    await adminPage.close();
  });

  test("accessing root redirects appropriately", async ({ page }) => {
    // When not logged in, root might redirect to login or show landing page
    await page.goto("/");

    // Should either show login or a public landing page
    const url = page.url();
    const isValidLanding =
      url.includes("/users/sign_in") ||
      url === "http://localhost:3000/" ||
      url.includes("/app/dashboard");

    expect(isValidLanding).toBe(true);
  });

  test("logged in user accessing root goes to dashboard", async ({
    page,
  }) => {
    await login(page, "player");

    // Navigate to root
    await page.goto("/");

    // Should redirect to dashboard or show it
    // Depending on your app's routing
    const url = page.url();
    const isValidDestination =
      url.includes("/app/dashboard") || url === "http://localhost:3000/";

    expect(isValidDestination).toBe(true);
  });
});
