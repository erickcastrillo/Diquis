import { expect } from "@playwright/test";
import { login, logout } from "../helpers/auth";
import { test } from "@playwright/test";

test.describe("User Logout", () => {
  test.skip("successful logout clears session", async ({ page, context }) => {
    await login(page, "super_admin");

    // Wait for dashboard to load
    await page.waitForURL(/\/app\/dashboard/);

    // Logout using the UI
    await logout(page);

    // Should redirect to login page
    await expect(page).toHaveURL(/\/(users\/sign_in|\/)/);

    // Verify session is cleared by attempting to access dashboard
    await page.goto("/app/dashboard");
    await expect(page).toHaveURL(/\/users\/sign_in/);
  });
});
