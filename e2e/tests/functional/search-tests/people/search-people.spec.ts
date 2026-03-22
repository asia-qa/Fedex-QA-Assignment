import {
  verifyOrderedPeopleDataDisplayedCorrectly,
  verifyNoResultsDisplayed,
  verifyCharacterCard,
} from "@assertions/people/search-people.assertions";
import { CUSTOM_TIMEOUTS } from "@constants/custom-timeouts";
import { SEARCH_CATEGORIES } from "@constants/search-categories";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Search People Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Verify "People" category selected by default', async () => {
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
    });
  });

  test("Should display character details when search for existing character with search button click", async ({
    searchPage,
    validCharacterSearch,
  }) => {
    const { searchTerm, searchedData } = validCharacterSearch;

    await test.step("Search for an existing character with search button", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify character details are displayed correctly", async () => {
      await expect(searchPage.characterCard.rootContainer).toHaveCount(
        searchedData.length,
      );
      await verifyCharacterCard(searchPage.characterCard, searchedData[0]);
      await expect.soft(searchPage.noResultsMessage).toBeHidden();
      await expect.soft(searchPage.loadingMessage).toBeHidden();
    });
  });

  test("Should display character details when search for existing character with lower case name", async ({
    searchPage,
    validCharacterSearchLowerCase,
  }) => {
    const { searchTerm, searchedData } = validCharacterSearchLowerCase;

    await test.step("Search for an existing character with search button", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify character details are displayed correctly", async () => {
      await verifyCharacterCard(searchPage.characterCard, searchedData[0]);
    });
  });

    test("Should display character details when response delayed", async ({
    searchPage,
    validCharacterSearchDelayed,
  }) => {
    test.slow();
    const { searchTerm, searchedData } = validCharacterSearchDelayed;

    await test.step("Search for an existing character with search button", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify character details are displayed correctly", async () => {
      await expect(searchPage.characterCard.rootContainer).toHaveCount(
        searchedData.length, { timeout: CUSTOM_TIMEOUTS.delayedExpect },
      );
      await verifyCharacterCard(searchPage.characterCard, searchedData[0]);
      await expect.soft(searchPage.noResultsMessage).toBeHidden();
      await expect.soft(searchPage.loadingMessage).toBeHidden();
    });
  });

  test('Should display "Not found" message when search for non-existing character name', async ({
    invalidCharacterSearch,
    searchPage,
  }) => {
    const { searchTerm } = invalidCharacterSearch;

    await test.step("Search for a non-existing character name", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step('Verify "Not found" message is displayed', async () => {
      await verifyNoResultsDisplayed(searchPage);
    });
  });

  test("Should display multiple results when search for partially matching name", async ({
    searchPage,
    validCharacterSearchPartialMatch,
  }) => {
    const { searchTerm: partialMatch, searchedData } =
      validCharacterSearchPartialMatch;

    await test.step("Search for a phrase partially matching character names", async () => {
      await searchPage.searchForQueryByButton(partialMatch);
    });

    await test.step("Verify all returned results contain searched phrase", async () => {
      await expect
        .soft(searchPage.characterCard.subtitle)
        .toContainText(searchedData.map(() => partialMatch));
    });

    await test.step("Verify all character details are displayed correctly", async () => {
      await verifyOrderedPeopleDataDisplayedCorrectly(searchPage, searchedData);
    });
  });

  test("Should display correct people search results when switching categories", async ({
    searchPage,
    validCharacterSearch,
    validPlanetSearch,
  }) => {
    const { searchTerm: initialSearchTerm, searchedData: initialData } =
      validPlanetSearch;
    const { searchTerm: characterSearchTerm, searchedData: finalSearchData } =
      validCharacterSearch;

    await test.step("Navigate to planets search results and verify results displayed", async () => {
      await searchPage.navigateToSearchResults(
        SEARCH_CATEGORIES.PLANETS,
        initialSearchTerm,
      );
      await expect.soft(searchPage.searchCard.planetsRadioButton).toBeChecked();
      await expect
        .soft(searchPage.planetCard.rootContainer)
        .toHaveCount(initialData.length);
    });

    await test.step("Switch to people category and search for existing character name", async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PEOPLE);
      await searchPage.searchCard.searchInput.clear();
      await searchPage.searchForQueryByButton(characterSearchTerm);
    });

    await test.step("Verify previous search results cleared and only people results displayed", async () => {
      await expect(searchPage.searchCard.planetsRadioButton).not.toBeChecked();
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await expect(searchPage.planetCard.rootContainer).toBeHidden();
      await verifyOrderedPeopleDataDisplayedCorrectly(
        searchPage,
        finalSearchData,
      );
    });
  });

  test("Should clear previous results when search for empty input", async ({
    emptyInputSearch,
    searchPage,
    validCharacterSearch,
  }) => {
    const { searchTerm: emptyInput } = emptyInputSearch;

    await test.step("Navigate to search results and verify search results displayed", async () => {
      const { searchTerm: name, searchedData: initialData } =
        validCharacterSearch;
      await searchPage.navigateToSearchResults(SEARCH_CATEGORIES.PEOPLE, name);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await expect(searchPage.characterCard.subtitle).toHaveCount(
        initialData.length,
      );
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
