import { SearchPage } from "@pages/search.page";
import { test as base } from "@playwright/test";
interface UiFixtures {
  searchPage: SearchPage;
}

export const uiTest = base.extend<UiFixtures>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await page.goto("/");
    await use(searchPage);
  },
});
