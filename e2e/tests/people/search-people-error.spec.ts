import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Search People with Error Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Verify "People" category selected by default', async () => {
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
    });
  });

  test("Should display loading state when server error returned", async ({
    searchPage,
    serverErrorPeopleSearch: serverErrorSearch,
  }) => {
    const { searchTerm } = serverErrorSearch;

    await test.step("Search for an existing character", async () => {
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
