import { test as base } from "@playwright/test";
import { MockServer } from "@mocks/mockServer";
import { Person } from "@support/types/person";
import { VALID_CHARACTERS } from "@mocks/data/people/valid-characters.data";
import { mockSearchPeopleResponse } from "@mocks/handlers/people.handler";
import { API_URLS } from "@support/api-urls";
import { buildPerson } from "@support/test-data-builders/people/person.builder";
import { buildPeopleSearchSuccessResponse } from "@support/test-data-builders/people/response/people-search-response.builder";
import { buildErrorResponse } from "@support/test-data-builders/shared/response/error-response.builder";
import {
  SearchScenario,
  SearchErrorScenario,
} from "@support/types/search-scenario";
import { ERROR_MESSAGES } from "@constants/search-page-labels";
import { CUSTOM_TIMEOUTS } from "@constants/custom-timeouts";

interface PeopleMockScenarioFixtures {
  mockServer: MockServer;
  emptyInputSearch: SearchScenario<Person[]>;
  invalidCharacterSearch: SearchScenario<Person[]>;
  serverErrorPeopleSearch: SearchErrorScenario;
  validCharacterSearch: SearchScenario<Person[]>;
  validCharacterSearchDelayed: SearchScenario<Person[]>;
  validCharacterSearchLowerCase: SearchScenario<Person[]>;
  validCharacterSearchPartialMatch: SearchScenario<Person[]>;
}

export const peopleTest = base.extend<PeopleMockScenarioFixtures>({
  validCharacterSearch: async ({ mockServer }, use) => {
    const luke = VALID_CHARACTERS[0];
    const character = buildPerson(luke);
    const searchTerm = character.name;
    const searchResponse = buildPeopleSearchSuccessResponse([character]);
    await mockSearchPeopleResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [character] });
  },
  validCharacterSearchDelayed: async ({ mockServer }, use) => {
    const luke = VALID_CHARACTERS[0];
    const delayMs = CUSTOM_TIMEOUTS.delayedResponse;
    const status = 200;
    const character = buildPerson(luke);
    const searchTerm = character.name;
    const searchResponse = buildPeopleSearchSuccessResponse([character]);
    await mockSearchPeopleResponse(
      mockServer,
      searchResponse,
      searchTerm,
      status,
      delayMs,
    );
    await use({ searchTerm, searchedData: [character] });
  },
  validCharacterSearchLowerCase: async ({ mockServer }, use) => {
    const anakin = VALID_CHARACTERS[1];
    const character = buildPerson(anakin);
    const searchTerm = character.name.toLowerCase();
    const searchResponse = buildPeopleSearchSuccessResponse([character]);
    await mockSearchPeopleResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [character] });
  },
  validCharacterSearchPartialMatch: async ({ mockServer }, use) => {
    const validCharacters = VALID_CHARACTERS.map((character) =>
      buildPerson(character),
    );
    const searchTerm = validCharacters[0].name.split(" ")[1]; // Using last name for partial match
    const searchResponse = buildPeopleSearchSuccessResponse(validCharacters);
    await mockSearchPeopleResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: validCharacters });
  },
  invalidCharacterSearch: async ({ mockServer }, use) => {
    const searchTerm = "NonExistingCharacterName";
    const searchResponse = buildPeopleSearchSuccessResponse([]);
    await mockSearchPeopleResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [] });
  },
  emptyInputSearch: async ({ mockServer }, use) => {
    const searchTerm = "";
    const searchResponse = buildPeopleSearchSuccessResponse([]);
    await mockSearchPeopleResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [] });
  },
  serverErrorPeopleSearch: async ({ mockServer }, use) => {
    const searchTerm = VALID_CHARACTERS[0].name;
    const searchResponse = buildErrorResponse(500, ERROR_MESSAGES.serverError);
    const encodedTerm = encodeURIComponent(searchTerm);
    await mockServer.mockSearchErrorResponse(
      API_URLS.PEOPLE_SEARCH + encodedTerm,
      searchResponse,
    );
    await use({ searchTerm, error: searchResponse });
  },
});
