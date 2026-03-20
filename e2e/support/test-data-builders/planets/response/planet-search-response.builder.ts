import { faker } from "@faker-js/faker";
import { Planet } from "@support/types/planet";
import { SearchResponse } from "@support/types/search-response";

export function buildPlanetSearchSuccessResponse(
  planets: Planet[],
): SearchResponse<Planet> {
  return {
    message: "ok",
    result: planets.map((planet, index) => ({
      properties: planet,
      _id: faker.string.uuid(),
      uid: `${index + 1}`,
      description: faker.word.words(5),
      __v: 2,
    })),
    apiVersion: "1.0",
    timestamp: new Date().toISOString(),
  };
}
