import { Locator, Page } from "@playwright/test";

export class CharacterCardComponent {
    private readonly page: Page;
    readonly birthYear: Locator;
    readonly eyeColor: Locator;
    readonly gender: Locator;
    readonly skinColor: Locator;
    readonly subtitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subtitle = this.page.getByTestId('name');
        this.birthYear = this.page.getByTestId('birth-year-value');
        this.eyeColor = this.page.getByTestId('eye-color-value');
        this.gender = this.page.getByTestId('gender-value');
        this.skinColor = this.page.getByTestId('skin-color-value');
    }
}
