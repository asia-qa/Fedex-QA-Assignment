import { Page } from "@playwright/test";

/**
 * General mock layer abstraction for API calls, allowing to easily mock responses for specific endpoints.
 * This class can be extended in the future to include more complex scenarios,
 * such as conditional responses based on request parameters,
 * or to mock other HTTP methods (POST, PUT, DELETE, etc.).
 */
export class MockServer {
    constructor (private page: Page) {}

    async mockGetResponse(url: string, response: any, status = 200) {
        await this.page.route(url, route => {route.fulfill({
            status: status,
            contentType: 'application/json',
            body: JSON.stringify(response)
        })
        })
    }
}