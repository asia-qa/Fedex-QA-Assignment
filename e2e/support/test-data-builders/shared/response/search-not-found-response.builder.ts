import { SearchResponse } from "@support/types/search-response";

export function buildSearchNotFoundResponse<T>(): SearchResponse<T> {
  return {
    message: "Not found",
    result: [],
    apiVersion: "1.0",
    timestamp: new Date().toISOString(),
  };
}
