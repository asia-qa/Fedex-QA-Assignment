import { SEARCH_CATEGORIES } from "@constants/search-categories";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Planet Card Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Select "Planets" category', async () => {
      await searchPage.searchCard.selectSearchCategory(
        SEARCH_CATEGORIES.PLANETS,
      );
      await expect(searchPage.searchCard.planetsRadioButton).toBeChecked();
    });
  });

  test("Verify planet card", async ({ searchPage, validPlanetSearch }) => {
    const { searchTerm } = validPlanetSearch;

    await test.step("Search for an existing planet", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.planetCard.subtitle).toBeVisible();
    });

    await test.step("Verify planet card matches the baseline", async () => {
      await expect(searchPage.planetCard.rootContainer).toHaveScreenshot();
    });
  });
});
