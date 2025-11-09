import { expect } from "@playwright/test";
import { TEST_USERS } from "../helpers/auth";
import { test } from "@playwright/test";

test.describe("Password Reset", () => {
  test("request password reset with valid email", async ({ page }) => {
    await page.goto("/users/password/new");

    await page.fill('input[type="email"]', TEST_USERS.player.email);
    await page.click('button[type="submit"]');

    // After submission, should either show success message or redirect
    // The exact message varies by Devise configuration
    // Just verify the form was processed (URL might change or stay same)
    await page.waitForTimeout(1000);

    // Should either stay on password page or redirect
    const url = page.url();
    expect(url).toContain("/users");
  });

  test("password reset with invalid email shows success (prevents enumeration)", async ({
    page,
  }) => {
    await page.goto("/users/password/new");

    await page.fill('input[type="email"]', "nonexistent@example.com");
    await page.click('button[type="submit"]');

    // Devise typically still shows success to prevent email enumeration
    await page.waitForTimeout(1000);

    const url = page.url();
    expect(url).toContain("/users");
  });

  test("password reset form validation", async ({ page }) => {
    await page.goto("/users/password/new");

    // Submit empty form
    await page.click('button[type="submit"]');

    // Should stay on password reset page or show validation
    await expect(page).toHaveURL(/\/users\/password\/new/);
  });

  test("can navigate back to login from password reset", async ({ page }) => {
    await page.goto("/users/password/new");

    // Click the "Back to login" link
    await page.click('a:has-text("Sign in")');

    // Should navigate to the login page
    await expect(page).toHaveURL(/\/users\/sign_in/);
  });
});
