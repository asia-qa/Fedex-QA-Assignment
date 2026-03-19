import { SEARCH_CATEGORIES } from "../constants/search-categories";
import { SEARCH_PAGE_LABELS } from "../constants/search-page-labels";
import { test, expect } from "../fixtures/mock.fixture";
import { mockSearchPeopleResponse } from "../mocks/handlers/people.handler";
import {
  buildPeopleSearchNotFoundResponse,
  buildPeopleSearchSuccessResponse,
} from "../support/test-data-builders/people-search-response.builder";
import { buildPerson } from "../support/test-data-builders/person.builder";

const anakin = buildPerson({ name: "Anakin Skywalker" });
const luke = buildPerson({ name: "Luke Skywalker" });
const { name } = luke;
const nonExistingCharacterName = "NonExistingCharacterName";
const partialMatchString = "Skywalker";

test.describe("Search People Tests", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify search page opened", async () => {
      await expect(searchPage.header).toHaveText(SEARCH_PAGE_LABELS.header);
    });
  });

  test("Should display character details when search for existing character name with search button click", async ({
    searchPage,
    mockServer,
  }) => {
    await test.step("Mock a valid character search response", async () => {
      const response = buildPeopleSearchSuccessResponse([luke]);
      await mockSearchPeopleResponse(mockServer, response, name);
    });
    await test.step("Search for an existing character name by search button", async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PEOPLE);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await searchPage.searchForQueryByButton(name);
    });
    await test.step("Verify character details are displayed", async () => {
      await expect.soft(searchPage.characterCard.subtitle).toHaveCount(1);
      await expect.soft(searchPage.characterCard.subtitle).toBeVisible();
      await expect.soft(searchPage.characterCard.subtitle).toContainText(name);
    });
  });

  test("Should display character details when search for existing character name with Enter key", async ({
    searchPage,
    mockServer,
  }) => {
    await test.step("Mock a valid character search response", async () => {
      const response = buildPeopleSearchSuccessResponse([luke]);
      await mockSearchPeopleResponse(mockServer, response, name);
    });
    await test.step("Search for an existing character name by Enter key", async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PEOPLE);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await searchPage.searchForQueryByEnter(name);
    });
    await test.step("Verify character details are displayed", async () => {
      await expect.soft(searchPage.characterCard.subtitle).toHaveCount(1);
      await expect.soft(searchPage.characterCard.subtitle).toBeVisible();
      await expect.soft(searchPage.characterCard.subtitle).toContainText(name);
    });
  });

  test('Should display "Not found" message when search for non-existing character name.', async ({
    mockServer,
    searchPage,
  }) => {
    await test.step("Mock a search not found response.", async () => {
      const response = buildPeopleSearchNotFoundResponse();
      await mockSearchPeopleResponse(
        mockServer,
        response,
        nonExistingCharacterName,
      );
    });

    await test.step("Search for a non-existing character name", async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PEOPLE);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await searchPage.searchForQueryByButton(nonExistingCharacterName);
    });

    await test.step('Verify "Not found" message is displayed', async () => {
      await expect(searchPage.noResultsMessage).toBeVisible();
      await expect(searchPage.noResultsMessage).toHaveText(
        SEARCH_PAGE_LABELS.noResultsFoundMessage,
      );
    });
  });

  test("Should display multiple results when search for partially matching name", async ({
    mockServer,
    searchPage,
  }) => {
    const matchedCharacters = [luke, anakin];
    await test.step("Mock a search response with multiple matching results", async () => {
      const response = buildPeopleSearchSuccessResponse(matchedCharacters);
      await mockSearchPeopleResponse(mockServer, response, partialMatchString);
    });

    await test.step("Search for a partially matching character name", async () => {
      await searchPage.selectSearchCategory(SEARCH_CATEGORIES.PEOPLE);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await searchPage.searchForQueryByButton(partialMatchString);
    });

    await test.step("Verify returned results contain searched phrase", async () => {
      await expect(searchPage.characterCard.subtitle).toHaveCount(
        matchedCharacters.length,
      );
      for (let index = 0; index < matchedCharacters.length; index++) {
        await expect
          .soft(searchPage.characterCard.subtitle.nth(index))
          .toContainText(partialMatchString);
      }
    });
  });

  test("Should clear previous results when search for empty input", async ({
    mockServer,
    searchPage,
  }) => {
    const emptyInput = "";
    await test.step("Mock a valid character search response", async () => {
      const response = buildPeopleSearchSuccessResponse([luke]);
      await mockSearchPeopleResponse(mockServer, response, name);
    });

    await test.step("Navigate to search results and verify search results displayed", async () => {
      await searchPage.navigateToSearchResults(SEARCH_CATEGORIES.PEOPLE, name);
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await expect(searchPage.characterCard.subtitle).toHaveCount(1);
      await expect(searchPage.characterCard.subtitle).toBeVisible();
      await expect.soft(searchPage.characterCard.subtitle).toContainText(name);
    });

    await test.step("Mock search response for empty input", async () => {
      const response = buildPeopleSearchNotFoundResponse();
      await mockSearchPeopleResponse(mockServer, response, emptyInput);
    });
    await test.step("Search with an empty input", async () => {
      await searchPage.searchCard.searchInput.clear();
      await searchPage.searchForQueryByButton(emptyInput);
    });
    await test.step("Verify previous search results are cleared and 'Not found' message is displayed", async () => {
      await expect(searchPage.characterCard.subtitle).toBeHidden();
      await expect(searchPage.noResultsMessage).toBeVisible();
      await expect(searchPage.noResultsMessage).toHaveText(
        SEARCH_PAGE_LABELS.noResultsFoundMessage,
      );
    });
  });
});
