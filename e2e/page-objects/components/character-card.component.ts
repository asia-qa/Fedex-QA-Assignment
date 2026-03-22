import { LabelValueRowElement } from "@pages/elements/label-value-row.element";
import { Locator } from "@playwright/test";

/**
 * Component object for the character card component.
 */
export class CharacterCardComponent {
  readonly birthYear: LabelValueRowElement;
  readonly eyeColor: LabelValueRowElement;
  readonly gender: LabelValueRowElement;
  readonly rootContainer: Locator;
  readonly skinColor: LabelValueRowElement;
  readonly subtitle: Locator;

  constructor(rootContainer: Locator) {
    this.rootContainer = rootContainer;
    this.subtitle = this.rootContainer.getByTestId("name");
    this.birthYear = new LabelValueRowElement(
      this.rootContainer.getByTestId("birth-year"),
    );
    this.eyeColor = new LabelValueRowElement(
      this.rootContainer.getByTestId("eye-color"),
    );
    this.gender = new LabelValueRowElement(
      this.rootContainer.getByTestId("gender"),
    );
    this.skinColor = new LabelValueRowElement(
      this.rootContainer.getByTestId("skin-color"),
    );
  }
}
