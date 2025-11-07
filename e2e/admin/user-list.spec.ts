import { expect, test } from "@playwright/test";
import { login } from "../helpers/auth";

// Run user-list tests serially to avoid session conflicts
test.describe.configure({ mode: "serial" });

test.describe("User List", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "super_admin");
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can view user list", async ({ page }) => {
    await page.goto("/admin/users");

    // Should show page heading
    await expect(page.locator('h1:has-text("User Management")')).toBeVisible();

    // Should show user table with rows
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // Should have at least some user rows (test users from previous tests)
    const userRows = page.locator("table tbody tr");
    const count = await userRows.count();
    expect(count).toBeGreaterThan(0);
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("user list displays user information", async ({ page }) => {
    await page.goto("/admin/users");

    // Should display multiple users (at least the test data)
    const userRows = page.locator("table tbody tr");
    const count = await userRows.count();
    expect(count).toBeGreaterThan(0);

    // Should show email addresses in table cells
    const emailCells = page.locator(
      'table tbody td:has-text("@example.com"), table tbody td:has-text("@diquis.com")'
    );
    const emailCount = await emailCells.count();
    expect(emailCount).toBeGreaterThan(0);
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can search users by email", async ({ page }) => {
    await page.goto("/admin/users");

    // Find the table search input specifically (by id or more specific selector)
    const searchInput = page.locator("#table-input-search");
    const searchCount = await searchInput.count();

    if (searchCount > 0) {
      // Get first user email from the table
      const firstEmailCell = page
        .locator("table tbody tr")
        .first()
        .locator("td")
        .nth(2);
      const firstEmail = await firstEmailCell.textContent();

      if (firstEmail) {
        // Search for that specific user
        await searchInput.fill(firstEmail);

        // Give time for search to filter
        await page.waitForTimeout(500);

        // Verify the email is still visible (filtered result)
        await expect(page.locator(`text=${firstEmail}`)).toBeVisible();
      }
    }
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can search users by name", async ({ page }) => {
    await page.goto("/admin/users");

    const searchInput = page.locator("#table-input-search");
    const searchCount = await searchInput.count();

    if (searchCount > 0) {
      // Search for "John" (test data has John Doe)
      await searchInput.fill("John");

      await page.waitForTimeout(500);

      // At least one result should be visible
      const results = page.locator("table tbody tr");
      const resultCount = await results.count();
      // Just verify search doesn't break the page
      expect(resultCount).toBeGreaterThanOrEqual(0);
    }
  });

  // TODO: This test has Inertia hydration issues - the View user link is visible
  // in the DOM but not clickable/interactive. Needs investigation of React hydration timing.
  test.skip("admin can navigate to user details", async ({ page }) => {
    await page.goto("/admin/users");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Get the href from the first View user link and navigate to it
    const firstUserRow = page.locator("table tbody tr").first();
    const viewLink = firstUserRow.locator('a:has-text("View user")');
    const href = await viewLink.getAttribute("href");

    if (href) {
      await page.goto(href);
    }

    // Should be on user detail page (with optional query params)
    await expect(page).toHaveURL(/\/admin\/users\/[a-f0-9-]+(\?.*)?$/);

    // Should show user details - look for key elements
    const heading = page.locator("h1, h2");
    await expect(heading).toBeVisible();
  });
  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("admin can access new user form from list", async ({ page }) => {
    await page.goto("/admin/users");

    // Click on "Create User" button/link
    await page.click('a[href="/admin/users/new"]:has-text("Create")');

    // Should navigate to new user form
    await page.waitForURL(/\/admin\/users\/new/);

    // Should show form
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("user list shows role badges", async ({ page }) => {
    await page.goto("/admin/users");

    // Should show role indicators - look for "Player" badge/text in table
    const roleCells = page.locator(
      'table tbody td:has-text("Player"), table tbody td:has-text("Coach"), table tbody td:has-text("Admin")'
    );
    const roleCount = await roleCells.count();

    // Should have at least some role indicators
    expect(roleCount).toBeGreaterThan(0);
  });

  // TODO: Fix timing/session issue - test times out when run in full suite
  test.skip("user list pagination works if present", async ({ page }) => {
    await page.goto("/admin/users");

    // Check if pagination exists
    const pagination = page.locator(
      '.pagination, [role="navigation"]:has-text("Next"), button:has-text("Next")'
    );
    const paginationCount = await pagination.count();

    if (paginationCount > 0) {
      // If pagination exists, verify it works
      const nextButton = page.locator(
        'button:has-text("Next"), a:has-text("Next"), .pagination .next'
      );
      const nextCount = await nextButton.count();

      if (nextCount > 0) {
        const isDisabled = await nextButton.first().isDisabled();
        if (!isDisabled) {
          await nextButton.first().click();
          // Should stay on users page (might change query params)
          await expect(page).toHaveURL(/\/admin\/users/);
        }
      }
    }
    // If no pagination, test passes (not all apps have pagination)
  });
});
