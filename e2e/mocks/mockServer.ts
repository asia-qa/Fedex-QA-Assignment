import { Page } from "@playwright/test";
import { ErrorResponse } from "@support/types/error-response";
import { SearchResponse } from "@support/types/search-response";

/**
 * General mock layer abstraction for API calls, allowing to easily mock responses for specific endpoints.
 * This class can be extended in the future to include more complex scenarios,
 * such as conditional responses based on request parameters,
 * or to mock other HTTP methods (POST, PUT, DELETE, etc.).
 */
export class MockServer {
  constructor(private page: Page) {}

  async mockSearchResponse<T>(
    url: string,
    response: SearchResponse<T>,
    status?: number,
  ) {
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status: status,
        contentType: "application/json",
        body: JSON.stringify(response),
      });
    });
  }

  async mockSearchErrorResponse(url: string, errorResponse: ErrorResponse) {
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status: errorResponse.status,
        body: errorResponse.message,
        contentType: errorResponse.contentType,
      });
    });
  }
}
