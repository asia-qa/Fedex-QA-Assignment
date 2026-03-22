import { MockServer } from "@mocks/mockServer";
import { API_URLS } from "@support/api-urls";
import { Planet } from "@support/types/planet";
import { SearchResponse } from "@support/types/search-response";

/**
 * Provides a mocked response for the planets search endpoint of the API,
 * allowing tests to simulate various scenarios and validate the application's
 * behavior when searching for planets.
 * @param mockServer
 * @param response
 */
export const mockSearchPlanetResponse = async (
  mockServer: MockServer,
  response: SearchResponse<Planet>,
  query = "",
  status = 200,
) => {
  await mockServer.mockSearchResponse(
    API_URLS.PLANET_SEARCH + encodeURIComponent(query),
    response,
    status,
  );
};
