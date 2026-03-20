import { SEARCH_CATEGORIES } from "@constants/search-categories";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Search Planets with Error Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Select "Planets" category', async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PLANETS);
      await expect(searchPage.searchCard.planetsRadioButton).toBeChecked();
    });
  });

  test("Should display loading state when server error returned", async ({
    searchPage,
    serverErrorPlanetSearch,
  }) => {
    const { searchTerm } = serverErrorPlanetSearch;

    await test.step("Search for an existing planet", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify loading state is displayed", async () => {
      await expect(searchPage.loadingMessage).toBeVisible();
      await expect(searchPage.loadingMessage).toHaveText(
        SEARCH_PAGE_LABELS.loadingStateMessage,
      );
    });
  });
});
