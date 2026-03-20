import { Locator} from "@playwright/test";

export class LabelValueRowElement {
    readonly row: Locator;
    readonly label: Locator;
    readonly value: Locator;

    constructor(row: Locator) {
        this.row = row;
        this.label = row.getByTestId('label');
        this.value = row.getByTestId('value');
    }
}