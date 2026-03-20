import { MockServer } from "@mocks/mockServer";
import { test as base } from "@playwright/test";

interface MockFixtures {
  mockServer: MockServer;
}

export const mockTest = base.extend<MockFixtures>({
  mockServer: async ({ page }, use) => {
    const server = new MockServer(page);
    await use(server);
  },
});
