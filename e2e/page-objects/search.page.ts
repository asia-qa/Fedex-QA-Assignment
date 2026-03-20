import { SearchCategory } from "@constants/search-categories";
import { Locator, Page } from "@playwright/test";
import { CharacterCardComponent } from "./components/character-card.component";
import { PlanetCardComponent } from "./components/planet-card.component";
import { SearchCardComponent } from "./components/search-card.component";
export class SearchPage {
  private readonly _page: Page;
  readonly characterCard: CharacterCardComponent;
  readonly header: Locator;
  readonly loadingMessage: Locator;
  readonly noResultsMessage: Locator;
  readonly planetCard: PlanetCardComponent;
  readonly searchCard: SearchCardComponent;

  constructor(page: Page) {
    this._page = page;
    this.characterCard = new CharacterCardComponent(this._page);
    this.header = this._page.locator("h1");
    this.loadingMessage = this._page.getByTestId("loading-message");
    this.noResultsMessage = this._page.getByTestId("not-found-message");
    this.planetCard = new PlanetCardComponent(this._page);
    this.searchCard = new SearchCardComponent(this._page);
  }

  public get page() {
    return this._page;
  }

  async navigateToSearchResults(
    searchType: SearchCategory,
    searchPhrase: string,
  ) {
    await this.page.goto(`/?searchType=${searchType}&query=${searchPhrase}`);
  }

  async selectSearchCategory(category: SearchCategory) {
    await this.searchCard.selectSearchCategory(category);
  }

  async searchForQueryByButton(query: string) {
    await this.searchCard.enterSearchQuery(query);
    await this.searchCard.searchButton.click();
  }

  async searchForQueryByEnter(query: string) {
    await this.searchCard.enterSearchQuery(query);
    await this.searchCard.searchButton.press("Enter");
  }
}
