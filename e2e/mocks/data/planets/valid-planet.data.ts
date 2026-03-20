import { Planet } from "@support/types/planet";

export const VALID_PLANET_TATOOINE: Partial<Planet> = {
  name: "Tatooine",
  population: "200000",
  climate: "arid",
  gravity: "1 standard",
};

export const VALID_PLANETS_PARTIAL_MATCH: Partial<Planet>[] = [
  {
    name: "At Achrann",
    population: "200000",
    climate: "arid",
    gravity: "1 standard",
  },
  {
    name: "At Aravin",
    population: "4500000000",
    climate: "arid",
    gravity: "1 standard",
  },
];
