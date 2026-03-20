/**
 * Represents a single resource item returned from a SWAPI search response.
 */
export interface SearchResult<T> {
  properties: T;
  _id: string;
  uid: string;
  description: string;
  __v: number;
}

/**
 * Represents the structure of the response returned by the API when searching
 * for a resource in the Star Wars universe.
 */
export interface SearchResponse<T> {
  message: string;
  result: SearchResult<T>[];
  apiVersion: string;
  timestamp: string;
}
