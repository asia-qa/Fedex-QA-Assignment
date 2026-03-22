import {
  SEARCH_CATEGORIES,
  SearchCategory,
} from "@constants/search-categories";
import { Locator, Page } from "@playwright/test";

/**
 * Component object for the search card component.
 */
export class SearchCardComponent {
  private readonly _page: Page;
  readonly peopleRadioButton: Locator;
  readonly planetsRadioButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this._page = page;
    this.peopleRadioButton = this._page.getByTestId("people-radio-button");
    this.planetsRadioButton = this._page.getByTestId("planets-radio-button");
    this.searchInput = this._page.getByTestId("search-input");
    this.searchButton = this._page.getByTestId("search-button");
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
