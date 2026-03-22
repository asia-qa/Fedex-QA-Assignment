import { ERROR_MESSAGES } from "@constants/search-page-labels";
import {
  VALID_PLANET_TATOOINE,
  VALID_PLANETS_PARTIAL_MATCH,
} from "@mocks/data/planets/valid-planet.data";
import { mockSearchPlanetResponse } from "@mocks/handlers/planets.handler";
import { MockServer } from "@mocks/mockServer";
import { test as base } from "@playwright/test";
import { API_URLS } from "@support/api-urls";
import { buildPlanet } from "@support/test-data-builders/planets/planet.builder";
import { buildPlanetSearchSuccessResponse } from "@support/test-data-builders/planets/response/planet-search-response.builder";
import { buildErrorResponse } from "@support/test-data-builders/shared/response/error-response.builder";
import { Planet } from "@support/types/planet";
import {
  SearchScenario,
  SearchErrorScenario,
} from "@support/types/search-scenario";
interface PlanetMockScenarioFixtures {
  mockServer: MockServer;
  emptyInputSearch: SearchScenario<Planet[]>;
  invalidPlanetSearch: SearchScenario<Planet[]>;
  serverErrorPlanetSearch: SearchErrorScenario;
  validPlanetSearch: SearchScenario<Planet[]>;
  validPlanetSearchPartialMatch: SearchScenario<Planet[]>;
}

export const planetTest = base.extend<PlanetMockScenarioFixtures>({
  validPlanetSearch: async ({ mockServer }, use) => {
    const planet = buildPlanet(VALID_PLANET_TATOOINE);
    const searchTerm = planet.name;
    const searchResponse = buildPlanetSearchSuccessResponse([planet]);
    await mockSearchPlanetResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [planet] });
  },
  validPlanetSearchPartialMatch: async ({ mockServer }, use) => {
    const planets = VALID_PLANETS_PARTIAL_MATCH.map((planetData) =>
      buildPlanet(planetData),
    );
    const searchTerm = planets[0].name.split(" ")[0]; // Using first name for partial match
    const searchResponse = buildPlanetSearchSuccessResponse(planets);
    await mockSearchPlanetResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: planets });
  },
  invalidPlanetSearch: async ({ mockServer }, use) => {
    const searchTerm = "NonExistingPlanetName";
    const searchResponse = buildPlanetSearchSuccessResponse([]);
    await mockSearchPlanetResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [] });
  },
  emptyInputSearch: async ({ mockServer }, use) => {
    const searchTerm = "";
    const searchResponse = buildPlanetSearchSuccessResponse([]);
    await mockSearchPlanetResponse(mockServer, searchResponse, searchTerm);
    await use({ searchTerm, searchedData: [] });
  },
  serverErrorPlanetSearch: async ({ mockServer }, use) => {
    const searchTerm = VALID_PLANET_TATOOINE.name;
    const searchResponse = buildErrorResponse(500, ERROR_MESSAGES.serverError);
    const encodedTerm = encodeURIComponent(searchTerm);
    await mockServer.mockSearchErrorResponse(
      API_URLS.PLANET_SEARCH + encodedTerm,
      searchResponse,
    );
    await use({ searchTerm, error: searchResponse });
  },
});
