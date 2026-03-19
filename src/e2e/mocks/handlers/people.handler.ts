import { MockServer } from "../mockServer";
import { API_URLS } from "../../support/api-urls";
import { SearchResponse } from "../../support/types/search-response";
import { Person } from "../../support/types/person";

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
  searchTerm: string = "",
) => {
  await mockServer.mockGetResponse(
    API_URLS.PEOPLE_SEARCH + searchTerm,
    response,
  );
};
