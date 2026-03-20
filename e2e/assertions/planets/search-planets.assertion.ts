import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { expect } from "@fixtures/fixtures";
import { SearchPage } from "@pages/search.page";
import { Planet } from "@support/types/planet";

export async function verifyPlanetsDetailsDisplayedCorrectly(
  searchPage: SearchPage,
  planetsData: Planet[],
) {
  for (const planet of planetsData) {
    await expect.soft(searchPage.planetCard.subtitle).toHaveText(planet.name);
    await expect
      .soft(searchPage.planetCard.climate.value)
      .toHaveText(planet.climate);
    await expect
      .soft(searchPage.planetCard.gravity.value)
      .toHaveText(planet.gravity);
    await expect
      .soft(searchPage.planetCard.population.value)
      .toHaveText(planet.population);
  }
}

export async function verifyNoResultsDisplayed(searchPage: SearchPage) {
  await expect.soft(searchPage.planetCard.subtitle).toBeHidden();
  await expect.soft(searchPage.noResultsMessage).toBeVisible();
  await expect
    .soft(searchPage.noResultsMessage)
    .toHaveText(SEARCH_PAGE_LABELS.noResultsFoundMessage);
}
