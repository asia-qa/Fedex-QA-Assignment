import { test as base } from "@playwright/test";
import { SearchPage } from "../page-objects/search.page";

interface UiFixtures {
  searchPage: SearchPage;
}

export const test = base.extend<UiFixtures>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await page.goto("/")
    await use(searchPage);
  },
});

export { expect } from "@playwright/test";
