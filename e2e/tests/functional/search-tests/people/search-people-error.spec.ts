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

  // This test is expected to fail as the error handling is not implemented yet
  // TODO: Verify if test can pass after the implementation
  test.fail(
    "Should display error message when server error returned",
    async ({ searchPage, serverErrorPeopleSearch }) => {
      const { searchTerm, error } = serverErrorPeopleSearch;

      await test.step("Search for an existing character", async () => {
        await searchPage.searchForQueryByButton(searchTerm);
      });

      await test.step("Verify error message is displayed", async () => {
        await expect(searchPage.errorMessage).toHaveText(error.message);
        await expect(searchPage.loadingMessage).toBeHidden();
      });
    },
  );
});
