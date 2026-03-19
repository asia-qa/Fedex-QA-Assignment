import { MockServer } from "../mocks/mockServer";
import { test as base } from "./ui.fixture";

interface MockFixtures {
  mockServer: MockServer;
}

export const test = base.extend<MockFixtures>({
  mockServer: async ({ page }, use) => {
    const mockServer = new MockServer(page);
    await use(mockServer);
  },
});

export { expect } from "./ui.fixture";
