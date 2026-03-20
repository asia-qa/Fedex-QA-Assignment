import { ErrorResponse } from "./error-response";

export interface SearchScenario<TData> {
  searchTerm: string;
  searchedData: TData;
};

export interface SearchErrorScenario {
  searchTerm: string;
  error: ErrorResponse;
};
