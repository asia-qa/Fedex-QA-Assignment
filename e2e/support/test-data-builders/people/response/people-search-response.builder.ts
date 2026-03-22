import { faker } from "@faker-js/faker";
import { Person } from "@support/types/person";
import { SearchResponse } from "@support/types/search-response";

const FIXED_API_VERSION = "1.0";
const FIXED_RESULT_VERSION = 4;

export function buildPeopleSearchSuccessResponse(
  people: Person[],
): SearchResponse<Person> {
  return {
    message: "ok",
    result: people.map((person, index) => ({
      properties: person,
      _id: faker.string.uuid(),
      uid: `${index + 1}`,
      description: faker.word.words(5),
      __v: FIXED_RESULT_VERSION,
    })),
    apiVersion: FIXED_API_VERSION,
    timestamp: new Date().toISOString(),
  };
}
