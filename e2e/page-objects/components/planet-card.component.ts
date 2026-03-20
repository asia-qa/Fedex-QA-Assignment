import { LabelValueRowElement } from "@pages/elements/label-value-row.element";
import { Locator, Page } from "@playwright/test";

/**
 * Component object for the planet card component.
 */

export class PlanetCardComponent {
  private readonly _page: Page;
  readonly climate: LabelValueRowElement;
  readonly gravity: LabelValueRowElement;
  readonly population: LabelValueRowElement;
  readonly rootContainer: Locator;
  readonly subtitle: Locator;

  constructor(page: Page) {
    this._page = page;
    this.climate = new LabelValueRowElement(this._page.getByTestId("climate"));
    this.gravity = new LabelValueRowElement(this._page.getByTestId("gravity"));
    this.population = new LabelValueRowElement(
      this._page.getByTestId("population"),
    );
    this.rootContainer = this._page.getByTestId("planet-card");
    this.subtitle = this._page.getByTestId("name");
  }
}
