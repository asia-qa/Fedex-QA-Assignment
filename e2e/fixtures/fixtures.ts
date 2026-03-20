import { mergeTests } from "@playwright/test";
import { planetTest } from "./planet.fixture";
import { peopleTest } from "./people.fixture";
import { uiTest } from "./ui.fixture";
import { mockTest } from "./mock.fixture";

export const test = mergeTests(uiTest, peopleTest, planetTest, mockTest);

export { expect } from "@playwright/test";