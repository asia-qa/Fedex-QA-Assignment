import { SEARCH_CATEGORIES } from "@constants/search-categories";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Planets Search Page Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Select "Planets" category', async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PLANETS);
      await expect(searchPage.searchCard.planetsRadioButton).toBeChecked();
    });
  });

  test("Verify empty search page state", async ({ searchPage }) => {
    await expect(searchPage.page).toHaveScreenshot();
  });

  test("Verify search page with planet card list state", async ({
    searchPage,
    validPlanetSearchPartialMatch,
  }) => {
    const { searchTerm, searchedData } = validPlanetSearchPartialMatch;

    await test.step("Search for multiple planets", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.planetCard.subtitle).toHaveCount(
        searchedData.length,
      );
    });

    await test.step("Verify page matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });

  test("Verify planets search page in loading state", async ({
    searchPage,
    serverErrorPlanetSearch,
  }) => {
    const { searchTerm } = serverErrorPlanetSearch;

    await test.step("Search and trigger loading state", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.loadingMessage).toBeVisible();
    });

    await test.step("Verify loading state matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });

  test("Verify planets search page with empty result", async ({
    searchPage,
    invalidPlanetSearch,
  }) => {
    const { searchTerm } = invalidPlanetSearch;

    await test.step("Search and trigger empty state", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.noResultsMessage).toBeVisible();
    });

    await test.step("Verify empty search state matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });
});
