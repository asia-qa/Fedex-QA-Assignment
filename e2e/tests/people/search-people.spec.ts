import {
  verifyPeopleDetailsDisplayedCorrectly,
  verifyNoResultsDisplayed,
} from "@assertions/people/search-people.assertions";
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
    const { searchTerm } = validCharacterSearch;
    const { searchedData } = validCharacterSearch;

    await test.step("Search for an existing character with search button", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
    });

    await test.step("Verify character details are displayed", async () => {
      await expect
        .soft(searchPage.characterCard.subtitle)
        .toHaveCount(searchedData.length);
      await verifyPeopleDetailsDisplayedCorrectly(searchPage, searchedData);
    });
  });

  test('Should display "Not found" message when search for non-existing character name.', async ({
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
      await expect(searchPage.characterCard.subtitle).toHaveCount(
        searchedData.length,
      );
      await expect
        .soft(searchPage.characterCard.subtitle)
        .toContainText(searchedData.map(() => partialMatch));
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
      await verifyPeopleDetailsDisplayedCorrectly(searchPage, initialData);
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
