import { faker } from "@faker-js/faker";
import { Person } from "@support/types/person";
import { SearchResponse } from "@support/types/search-response";

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
      __v: 4,
    })),
    apiVersion: "1.0",
    timestamp: new Date().toISOString(),
  };
}
