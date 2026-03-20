import { LabelValueRowElement } from "@pages/elements/label-value-row.element";
import { Locator, Page } from "@playwright/test";

/**
 * Component object for the character card component.
 */
export class CharacterCardComponent {
  private readonly _page: Page;
  readonly birthYear: LabelValueRowElement;
  readonly eyeColor: LabelValueRowElement;
  readonly gender: LabelValueRowElement;
  readonly rootContainer: Locator;
  readonly skinColor: LabelValueRowElement;
  readonly subtitle: Locator;

  constructor(page: Page) {
    this._page = page;
    this.subtitle = this._page.getByTestId("name");
    this.birthYear = new LabelValueRowElement(
      this._page.getByTestId("birth-year"),
    );
    this.eyeColor = new LabelValueRowElement(
      this._page.getByTestId("eye-color"),
    );
    this.gender = new LabelValueRowElement(this._page.getByTestId("gender"));
    this.rootContainer = this._page.getByTestId("character-card");
    this.skinColor = new LabelValueRowElement(
      this._page.getByTestId("skin-color"),
    );
  }
}
