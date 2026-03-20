import { MockServer } from "@mocks/mockServer";
import { API_URLS } from "@support/api-urls";
import { Person } from "@support/types/person";
import { SearchResponse } from "@support/types/search-response";

/**
 * Provides a mocked response for the people search endpoint of the API,
 * allowing tests to simulate various scenarios and validate the application's
 * behavior when searching for characters/people.
 * @param mockServer
 * @param response
 */
export const mockSearchPeopleResponse = async (
  mockServer: MockServer,
  response: SearchResponse<Person>,
  query = "",
  status = 200,
) => {
  await mockServer.mockSearchResponse(
    API_URLS.PEOPLE_SEARCH + encodeURIComponent(query),
    response,
    status,
  );
};
