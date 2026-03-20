import { verifyPeopleDetailsDisplayedCorrectly } from "@assertions/people/search-people.assertions";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { test, expect } from "@fixtures/fixtures";

test.describe("Search People with Keyboard Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });

    await test.step('Verify "People" category selected by default', async () => {
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
    });
  });

  test("Should display character details when search for existing character with Enter key", async ({
    searchPage,
    validCharacterSearch,
  }) => {
    const { searchTerm } = validCharacterSearch;
    const { searchedData } = validCharacterSearch;

    await test.step("Search for an existing character with Enter key", async () => {
      await searchPage.searchForQueryByEnter(searchTerm);
    });

    await test.step("Verify character details are displayed", async () => {
      await expect.soft(searchPage.characterCard.subtitle).toHaveCount(1);
      await expect.soft(searchPage.characterCard.subtitle).toBeVisible();
      await verifyPeopleDetailsDisplayedCorrectly(searchPage, searchedData);
    });
  });
});
