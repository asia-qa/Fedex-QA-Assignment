import { test, expect } from "@fixtures/fixtures";

test.describe("Search Input Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search input is visible", async () => {
      await expect(searchPage.searchCard.searchInput).toBeVisible();
    });
  });

  test("Verify initial search input state", async ({ searchPage }) => {
    await expect(searchPage.searchCard.searchInput).toHaveScreenshot();
  });

  test("Verify focused search input state", async ({ searchPage }) => {
    await searchPage.searchCard.searchInput.focus();
    await expect(searchPage.searchCard.searchInput).toHaveScreenshot();
  });
});
