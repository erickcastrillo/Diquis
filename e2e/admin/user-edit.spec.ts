import { expect, test } from "@playwright/test";
import { generateUserData } from "../fixtures/users";
import { login } from "../helpers/auth";

// Run tests serially to avoid session conflicts
test.describe.configure({ mode: "serial" });

test.describe("User Editing", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "super_admin");
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can edit existing user details", async ({
    page,
    request,
  }) => {
    const userData = generateUserData(
      "player"
    ) as typeof import("../fixtures/users").VALID_USER_DATA.player & {
      email: string;
    };

    // Create user first
    await page.goto("/admin/users/new");
    const form = page.locator("form");
    await form.locator('input[type="email"]').fill(userData.email);
    await form.locator("select.select-bordered").selectOption("player");

    const textInputs = form.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await textInputs.nth(0).fill(userData.first_name);
    await textInputs.nth(1).fill(userData.last_name);

    const passwordInputs = form.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(userData.password);
    await passwordInputs.nth(1).fill(userData.password);

    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+/);
    const userId = page.url().match(/\/admin\/users\/([a-f0-9-]+)/)?.[1];

    // Navigate to edit page
    await page.click(
      'link[href*="/edit"]:has-text("Edit"), a:has-text("Edit")'
    );
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+\/edit/);

    // Modify user data
    const editForm = page.locator("form");
    const editTextInputs = editForm.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await editTextInputs.nth(0).fill("Updated");
    await editTextInputs.nth(1).fill("Name");

    // Fill phone if field exists
    const phoneInput = editForm.locator('input[type="tel"]');
    const phoneCount = await phoneInput.count();
    if (phoneCount > 0) {
      await phoneInput.fill("+1234567890");
    }

    await page.click('button[type="submit"]');

    // Should redirect back to show page
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+$/);

    // Validate changes appear in the form fields
    const updatedForm = page.locator("form");
    const updatedTextInputs = updatedForm.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await expect(updatedTextInputs.nth(0)).toHaveValue("Updated");
    await expect(updatedTextInputs.nth(1)).toHaveValue("Name");
    if (phoneCount > 0) {
      await expect(page.locator('input[type="tel"]')).toHaveValue(
        "+1234567890"
      );
    }

    // Backend validation requires test helper endpoints (TODO: implement)
    // const user = await getUser(request, userId!);
    // expect(user.first_name).toBe("Updated");
    // expect(user.last_name).toBe("Name");
    // validateAuditTrail(user, ["create", "update"]);

    // Cleanup would require test endpoints
    // await cleanupUsers(request, userData.email);
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can change user role", async ({ page, request }) => {
    const userData = generateUserData(
      "player"
    ) as typeof import("../fixtures/users").VALID_USER_DATA.player & {
      email: string;
    };

    // Create user
    await page.goto("/admin/users/new");
    const form = page.locator("form");
    await form.locator('input[type="email"]').fill(userData.email);
    await form.locator("select.select-bordered").selectOption("player");

    const textInputs = form.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await textInputs.nth(0).fill(userData.first_name);
    await textInputs.nth(1).fill(userData.last_name);

    const passwordInputs = form.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(userData.password);
    await passwordInputs.nth(1).fill(userData.password);

    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+/);

    // Edit role
    await page.click('a:has-text("Edit")');
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+\/edit/);

    await page.selectOption("select.select-bordered", "coach");
    await page.click('button[type="submit"]');

    // Should redirect back to edit page after update
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+\/edit/);

    // Verify role changed in the select dropdown
    const roleSelect = page.locator("select.select-bordered");
    await expect(roleSelect).toHaveValue("coach");

    // Backend validation requires test endpoints
    // const user = await getUser(request, userId!);
    // expect(user.role).toBe("coach");
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("validation errors when clearing required fields", async ({
    page,
  }) => {
    const userData = generateUserData(
      "player"
    ) as typeof import("../fixtures/users").VALID_USER_DATA.player & {
      email: string;
    };

    // Create user first
    await page.goto("/admin/users/new");
    const form = page.locator("form");
    await form.locator('input[type="email"]').fill(userData.email);
    await form.locator("select.select-bordered").selectOption("player");

    const textInputs = form.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await textInputs.nth(0).fill(userData.first_name);
    await textInputs.nth(1).fill(userData.last_name);

    const passwordInputs = form.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(userData.password);
    await passwordInputs.nth(1).fill(userData.password);

    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+/);

    // Navigate to edit
    await page.click(
      'link[href*="/edit"]:has-text("Edit"), a:has-text("Edit")'
    );
    await page.waitForURL(/\/admin\/users\/[a-f0-9-]+\/edit/);

    // Try to clear first name (required field)
    const editForm = page.locator("form");
    const editTextInputs = editForm.locator(
      'input.input-bordered:not([type="email"]):not([type="password"]):not([type="tel"])'
    );
    await editTextInputs.nth(0).fill("");

    await page.click('button[type="submit"]');

    // Should stay on edit page with validation errors
    await expect(page).toHaveURL(/\/admin\/users\/[a-f0-9-]+\/edit/);
  });
});
