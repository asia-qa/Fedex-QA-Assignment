import { verifyPlanetsDetailsDisplayedCorrectly } from "@assertions/planets/search-planets.assertion";
import { SEARCH_CATEGORIES } from "@constants/search-categories";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Search Planets Tests", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Select "Planets" category', async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PLANETS);
      await expect(searchPage.searchCard.planetsRadioButton).toBeChecked();
    });
  });

  test("Should display planet details when search for existing planet with Enter key", async ({
    searchPage,
    validPlanetSearch,
  }) => {
    const { searchTerm } = validPlanetSearch;
    const { searchedData } = validPlanetSearch;

    await test.step("Search for an existing planet with Enter key", async () => {
      await searchPage.searchForQueryByEnter(searchTerm);
    });

    await test.step("Verify planet details are displayed", async () => {
      await expect
        .soft(searchPage.planetCard.subtitle)
        .toHaveCount(searchedData.length);
      await expect.soft(searchPage.planetCard.subtitle).toBeVisible();
      await verifyPlanetsDetailsDisplayedCorrectly(searchPage, searchedData);
    });
  });
});
