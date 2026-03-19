import { Person } from '../types/person';


/**
 * Test data generator provides a default Person object 
 * with the ability to override specific fields with custom values when needed
 * @param overrides - An object containing the fields to override in the default Person object
 * @returns A Person object with the specified overrides applied
 */
export function buildPerson(overrides: Partial<Person>): Person {
  return {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    eye_color: 'blue',
    gender: 'male',
    hair_color: 'blond',
    height: '172',
    mass: '72',
    skin_color: 'fair',
    homeworld: 'https://swapi.tech/api/planets/1',
    films: ['https://swapi.tech/api/films/1'],
    species: [],
    starships: ['https://swapi.tech/api/starships/12'],
    vehicles: ['https://swapi.tech/api/vehicles/14'],
    url: 'https://swapi.tech/api/people/1',
    created: '2026-01-01T00:00:00.000Z',
    edited: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}