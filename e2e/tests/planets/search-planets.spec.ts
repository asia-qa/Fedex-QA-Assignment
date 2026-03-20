import { verifyNoResultsDisplayed } from "@assertions/people/search-people.assertions";
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

  test("Should display planet details when search for existing planet with search button click", async ({
    searchPage,
    validPlanetSearch,
  }) => {
    const { searchTerm } = validPlanetSearch;
    const { searchedData: planetData } = validPlanetSearch;

    await test.step("Search for an existing planet with search button", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify search details displayed correctly", async () => {
      await expect
        .soft(searchPage.planetCard.subtitle)
        .toHaveCount(planetData.length);
      await verifyPlanetsDetailsDisplayedCorrectly(searchPage, planetData);
    });
  });

  test("Should display multiple results when search for partially matching phrase", async ({
    searchPage,
    validPlanetSearchPartialMatch,
  }) => {
    const { searchTerm: partialMatch } = validPlanetSearchPartialMatch;
    const { searchedData } = validPlanetSearchPartialMatch;

    await test.step("Search for a phrase partially matching planet names", async () => {
      await searchPage.searchForQueryByButton(partialMatch);
    });

    await test.step("Verify returned results contain searched phrase", async () => {
      await expect(searchPage.planetCard.subtitle).toHaveCount(
        searchedData.length,
      );
      await expect
        .soft(searchPage.planetCard.subtitle)
        .toContainText(searchedData.map(() => partialMatch));
    });
  });

  test('Should display "Not found" message when search for non-existing planet name.', async ({
    invalidPlanetSearch,
    searchPage,
  }) => {
    const { searchTerm } = invalidPlanetSearch;

    await test.step("Search for a non-existing planet name", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step('Verify "Not found" message is displayed', async () => {
      await verifyNoResultsDisplayed(searchPage);
    });
  });

  test("Should clear previous results when search for empty input", async ({
    emptyInputSearch,
    searchPage,
    validPlanetSearch,
  }) => {
    const { searchTerm: emptyInput } = emptyInputSearch;

    await test.step("Navigate to initial search results and verify search results displayed", async () => {
      const { searchTerm: initialSearchName } = validPlanetSearch;
      const { searchedData: initialData } = validPlanetSearch;

      await searchPage.navigateToSearchResults(
        SEARCH_CATEGORIES.PLANETS,
        initialSearchName,
      );
      await expect.soft(searchPage.searchCard.planetsRadioButton).toBeChecked();
      await expect
        .soft(searchPage.planetCard.subtitle)
        .toHaveCount(initialData.length);
      await verifyPlanetsDetailsDisplayedCorrectly(searchPage, initialData);
    });

    await test.step("Search with an empty input", async () => {
      await searchPage.searchCard.searchInput.clear();
      await searchPage.searchForQueryByButton(emptyInput);
    });

    await test.step("Verify previous search results cleared and 'Not found' message displayed", async () => {
      await verifyNoResultsDisplayed(searchPage);
    });
  });
});
