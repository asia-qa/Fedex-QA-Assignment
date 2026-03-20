import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Character Card Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page loaded", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
    });
  });

  test("Verify character card state", async ({
    searchPage,
    validCharacterSearch,
  }) => {
    const { searchTerm } = validCharacterSearch;

    await test.step("Search for an existing character", async () => {
      await searchPage.searchForQueryByButton(searchTerm);
      await expect(searchPage.characterCard.subtitle).toBeVisible();
    });

    await test.step("Verify character card matches the baseline", async () => {
      await expect(searchPage.characterCard.rootContainer).toHaveScreenshot();
    });
  });
});
