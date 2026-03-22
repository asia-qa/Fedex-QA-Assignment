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

  // This test is expected to fail as the error handling is not implemented yet
  // TODO: Verify if test can pass after the implementation
  test.fail(
    "Should display  error message when server error returned",
    async ({ searchPage, serverErrorPlanetSearch }) => {
      const { searchTerm, error } = serverErrorPlanetSearch;

      await test.step("Search for an existing planet", async () => {
        await searchPage.searchForQueryByButton(searchTerm);
      });

      await test.step("Verify error message is displayed", async () => {
        await expect(searchPage.errorMessage).toHaveText(error.message);
        await expect(searchPage.loadingMessage).toBeHidden();
      });
    },
  );
});
