import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("People Search Page Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page loaded", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
    });
  });

  test("Verify initial search page state", async ({ searchPage }) => {
    await expect(searchPage.page).toHaveScreenshot();
  });

  test("Verify search page with character card list", async ({
    searchPage,
    validCharacterSearchPartialMatch,
  }) => {
    const { searchTerm } = validCharacterSearchPartialMatch;
    const { searchedData } = validCharacterSearchPartialMatch;

    await test.step("Search for multiple characters", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.characterCard.subtitle).toHaveCount(
        searchedData.length,
      );
    });

    await test.step("Verify page matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });

  test("Verify people search page in loading state", async ({
    searchPage,
    serverErrorPeopleSearch,
  }) => {
    const { searchTerm } = serverErrorPeopleSearch;

    await test.step("Search and trigger loading state", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.loadingMessage).toBeVisible();
    });

    await test.step("Verify loading state matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });

  test("Verify people search page with empty result", async ({
    searchPage,
    invalidCharacterSearch,
  }) => {
    const { searchTerm } = invalidCharacterSearch;

    await test.step("Search and trigger empty state", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.noResultsMessage).toBeVisible();
    });

    await test.step("Verify empty state matches the baseline", async () => {
      await expect(searchPage.page).toHaveScreenshot();
    });
  });
});
