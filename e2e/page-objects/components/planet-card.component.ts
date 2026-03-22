import { LabelValueRowElement } from "@pages/elements/label-value-row.element";
import { Locator } from "@playwright/test";

/**
 * Component object for the planet card component.
 */

export class PlanetCardComponent {
  readonly climate: LabelValueRowElement;
  readonly gravity: LabelValueRowElement;
  readonly population: LabelValueRowElement;
  readonly rootContainer: Locator;
  readonly subtitle: Locator;

  constructor(rootContainer: Locator) {
    this.rootContainer = rootContainer;
    this.climate = new LabelValueRowElement(
      this.rootContainer.getByTestId("climate"),
    );
    this.gravity = new LabelValueRowElement(
      this.rootContainer.getByTestId("gravity"),
    );
    this.population = new LabelValueRowElement(
      this.rootContainer.getByTestId("population"),
    );
    this.subtitle = this.rootContainer.getByTestId("name");
  }
}
