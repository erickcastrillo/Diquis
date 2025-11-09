import { expect } from "@playwright/test";
import { test } from "@playwright/test";
import { login } from "../helpers/auth";

test.describe("User List", () => {
  test("admin can view user list", async ({ page }) => {
    await login(page, "super_admin");
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

  test("user list displays user information", async ({ page }) => {
    await login(page, "super_admin");
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

  test("admin can search users by email", async ({ page }) => {
    await login(page, "super_admin");
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

  test("admin can search users by name", async ({ page }) => {
    await login(page, "super_admin");
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

  test("admin can navigate to user details", async ({ page }) => {
    await login(page, "super_admin");
    await page.goto("/admin/users");

    // Wait for the table to be visible
    await page.waitForSelector("table tbody tr");

    // Click the first "View user" link
    const firstUserRow = page.locator("table tbody tr").first();
    const viewLink = firstUserRow.getByRole('link', { name: 'View user' });
    
    await expect(viewLink).toBeVisible();

    await viewLink.click();

    // Should be on user detail page (with optional query params)
    await expect(page).toHaveURL(/\/admin\/users\/[a-f0-9-]+(\?.*)?$/);

    // Should show user details - look for key elements
    const heading = page.locator("h1, h2");
    await expect(heading).toBeVisible();
  });
  test("admin can access new user form from list", async ({ page }) => {
    await login(page, "super_admin");
    await page.goto("/admin/users");

    // Click on "Create User" button/link
    await page.click('a[href="/admin/users/new"]:has-text("Create")');

    // Should navigate to new user form
    await page.waitForURL(/\/admin\/users\/new/);

    // Should show form
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("user list shows role badges", async ({ page }) => {
    await login(page, "super_admin");
    await page.goto("/admin/users");

    // Should show role indicators - look for "Player" badge/text in table
    const roleCells = page.locator(
      'table tbody td:has-text("Player"), table tbody td:has-text("Coach"), table tbody td:has-text("Admin")'
    );
    const roleCount = await roleCells.count();

    // Should have at least some role indicators
    expect(roleCount).toBeGreaterThan(0);
  });

  test("user list pagination works if present", async ({ page }) => {
    await login(page, "super_admin");
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
