import {
  SEARCH_CATEGORIES,
  SearchCategory,
} from "@constants/search-categories";
import { Locator, Page } from "@playwright/test";

/**
 * Component object for the search card component.
 */
export class SearchCardComponent {
  private readonly page: Page;
  readonly peopleRadioButton: Locator;
  readonly planetsRadioButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleRadioButton = this.page.locator("input#people");
    this.planetsRadioButton = this.page.locator("input#planets");
    this.searchInput = this.page.locator("input#query");
    this.searchButton = this.page.locator('button[type="submit"]');
  }

  async selectSearchCategory(category: SearchCategory) {
    if (category === SEARCH_CATEGORIES.PEOPLE) {
      await this.peopleRadioButton.check();
    } else {
      await this.planetsRadioButton.check();
    }
  }

  async enterSearchQuery(query: string) {
    await this.searchInput.fill(query);
  }
}
