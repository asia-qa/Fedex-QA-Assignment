import { Planet } from "@support/types/planet";

/**
 * Test data generator provides a default Planet object
 * with the ability to override specific fields with custom values when needed
 * @param overrides - An object containing the fields to override in the default Planet object
 * @returns A Planet object with the specified overrides applied
 */
export function buildPlanet(overrides: Partial<Planet>): Planet {
  return {
    name: "Tatooine",
    rotation_period: "24",
    orbital_period: "365",
    diameter: "12742",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
    url: "https://swapi.tech/api/planets/1",
    created: "2026-01-01T00:00:00.000Z",
    edited: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}
