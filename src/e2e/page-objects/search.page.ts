import { Locator, Page } from "@playwright/test";
import { SearchCardComponent } from "./components/search-card.component";
import { SearchCategory } from "../constants/search-categories";
import { CharacterCardComponent } from "./components/character-card.component";

export class SearchPage {
  private readonly page: Page;
  readonly characterCard: CharacterCardComponent;
  readonly header: Locator;
  readonly noResultsMessage: Locator;
  readonly searchCard: SearchCardComponent;


  constructor(page: Page) {
    this.page = page;
    this.characterCard = new CharacterCardComponent(this.page);
    this.header = this.page.locator("h1");
    this.noResultsMessage = this.page.getByTestId('not-found-message');
    this.searchCard = new SearchCardComponent(this.page);
  }

  async navigateToSearchResults(searchType: SearchCategory, searchPhrase: string) {
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
