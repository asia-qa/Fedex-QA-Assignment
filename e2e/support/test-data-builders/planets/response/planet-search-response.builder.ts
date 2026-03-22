import { faker } from "@faker-js/faker";
import { Planet } from "@support/types/planet";
import { SearchResponse } from "@support/types/search-response";

const FIXED_API_VERSION = "1.0";
const FIXED_RESULT_VERSION = 2;

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
      __v: FIXED_RESULT_VERSION,
    })),
    apiVersion: FIXED_API_VERSION,
    timestamp: new Date().toISOString(),
  };
}
