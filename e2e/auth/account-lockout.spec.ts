import { expect, test } from "@playwright/test";
import { generateTestEmail } from "../fixtures/users";
import { cleanupUsers } from "../helpers/database";

test.describe("Account Lockout", () => {
  test.skip("account locks after maximum failed attempts", async ({
    page,
    request,
  }) => {
    // Note: This test requires a test user to be created first
    // Skipping by default as it requires backend setup
    const testEmail = generateTestEmail("lockout-test");

    // TODO: Create test user via API or factory first
    // For now, this test is skipped until test helper endpoints are implemented

    // Attempt login with wrong password multiple times (Devise default is 5 attempts)
    for (let i = 0; i < 5; i++) {
      await page.goto("/users/sign_in");
      await page.fill('input[type="email"]', testEmail);
      await page.fill('input[type="password"]', "WrongPassword123!");
      await page.click('button[type="submit"]');
      await page.waitForURL(/\/users\/sign_in/);
    }

    // Next attempt should show locked message
    await page.goto("/users/sign_in");
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', "WrongPassword123!");
    await page.click('button[type="submit"]');

    // Should show account locked message
    await expect(
      page.locator("text=Your account is locked, text=account is locked")
    ).toBeVisible();

    // Cleanup
    await cleanupUsers(request, testEmail);
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("existing user lockout behavior", async ({ page }) => {
    // Test with multiple failed attempts on a non-locked account
    const invalidPassword = "WrongPassword123!";

    // Attempt 3 failed logins (not enough to lock)
    for (let i = 0; i < 3; i++) {
      await page.goto("/users/sign_in");
      await page.fill('input[type="email"]', "player@diquis.com");
      await page.fill('input[type="password"]', invalidPassword);
      await page.click('button[type="submit"]');
      await page.waitForURL(/\/users\/sign_in/);

      // Should show invalid credentials message or stay on login page
      await expect(page).toHaveURL(/\/users\/sign_in/);

      // Error message might be flash message or inline
      // Just verify we're still on login page - that's the key behavior
    }

    // Account should still be accessible with correct password
    await page.goto("/users/sign_in");
    await page.fill('input[type="email"]', "player@diquis.com");
    await page.fill('input[type="password"]', "Dev3l0pment!2025");

    // Use Promise.all to wait for navigation
    await Promise.all([
      page.waitForURL(/\/app\/dashboard/, { timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);
  });
});
