import { MockServer } from "../mockServer";
import { API_URLS } from "../../support/api-urls";
import { SearchResponse } from "../../support/types/search-response";
import { Planet } from "../../support/types/planet";

/**
 * Provides a mocked response for the planets search endpoint of the API, 
 * allowing tests to simulate various scenarios and validate the application's 
 * behavior when searching for planets.
 * @param mockServer 
 * @param response 
 */
export const mockGetPlanetsResponse = async (
  mockServer: MockServer,
  response: SearchResponse<Planet>,
  searchTerm: string = "",
) => {
  await mockServer.mockGetResponse(
    API_URLS.PLANET_SEARCH + searchTerm,
    response,
  );
};
