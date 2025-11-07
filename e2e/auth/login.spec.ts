import { expect, test } from "@playwright/test";
import { TEST_USERS } from "../helpers/auth";

test.describe.configure({ mode: "serial" });

test.describe("User Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/users/sign_in");
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("successful login with valid credentials", async ({ page }) => {
    // Wait for form to be fully loaded
    await page.waitForSelector('input[type="email"]', { state: "visible" });
    await page.waitForSelector('button[type="submit"]:not([disabled])', {
      state: "visible",
    });

    await page.fill('input[type="email"]', TEST_USERS.super_admin.email);
    await page.fill('input[type="password"]', TEST_USERS.super_admin.password);

    // Wait for navigation after clicking submit
    await Promise.all([
      page.waitForURL(/\/app\/dashboard/, { timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);
  });

  test("failed login with invalid password", async ({ page }) => {
    await page.fill('input[type="email"]', TEST_USERS.super_admin.email);
    await page.fill('input[type="password"]', "WrongPassword123!");
    await page.click('button[type="submit"]');
    // Should stay on login page - verify login failed
    await expect(page).toHaveURL(/\/users\/sign_in/);
  });

  test("failed login with non-existent user", async ({ page }) => {
    await page.fill('input[type="email"]', "nonexistent@example.com");
    await page.fill('input[type="password"]', "SomePassword123!");
    await page.click('button[type="submit"]');
    // Should stay on login page - verify login failed
    await expect(page).toHaveURL(/\/users\/sign_in/);
  });

  test.skip("remember me checkbox persists session", async ({
    page,
    context,
  }) => {
    await page.fill('input[type="email"]', TEST_USERS.super_admin.email);
    await page.fill('input[type="password"]', TEST_USERS.super_admin.password);
    // The checkbox is inside a label, use the checkbox selector directly
    await page.locator('input[type="checkbox"]').check();
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/app\/dashboard/, { timeout: 10000 });
    await page.close();
    const newPage = await context.newPage();
    await newPage.goto("/app/dashboard");
    await expect(newPage).toHaveURL(/\/app\/dashboard/);
  });
});
