import { test, expect } from "@fixtures/fixtures";

test.describe("Search Button Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search button is visible", async () => {
      await expect(searchPage.searchCard.searchButton).toBeVisible();
    });
  });

  test("Verify initial search button state", async ({ searchPage }) => {
    await expect(searchPage.searchCard.searchButton).toHaveScreenshot();
  });

  test("Verify search button hover state", async ({ searchPage }) => {
    await searchPage.searchCard.searchButton.hover();
    await expect(searchPage.searchCard.searchButton).toHaveScreenshot();
  });
});
