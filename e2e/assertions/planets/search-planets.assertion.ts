import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { expect } from "@fixtures/fixtures";
import { PlanetCardComponent } from "@pages/components/planet-card.component";
import { SearchPage } from "@pages/search.page";
import { Planet } from "@support/types/planet";
import { sortByName } from "@utils/sort-by-name.utils";

export async function verifyOrderedPlanetsDataDisplayedCorrect(
  searchPage: SearchPage,
  planetsData: Planet[],
) {
  const sortedData = sortByName(planetsData);
  await expect(searchPage.planetCard.rootContainer).toHaveCount(
    planetsData.length,
  );
  const cards = await searchPage.getPlanetCards();
  for (const [index, card] of cards.entries()) {
    await verifyPlanetCard(card, sortedData[index]);
  }
}

export async function verifyNoResultsDisplayed(searchPage: SearchPage) {
  await expect.soft(searchPage.planetCard.subtitle).toBeHidden();
  await expect.soft(searchPage.noResultsMessage).toBeVisible();
  await expect
    .soft(searchPage.noResultsMessage)
    .toHaveText(SEARCH_PAGE_LABELS.noResultsFoundMessage);
}

async function verifyPlanetCard(card: PlanetCardComponent, planet: Planet) {
  await expect.soft(card.subtitle).toHaveText(planet.name);
  await expect.soft(card.climate.value).toHaveText(planet.climate);
  await expect.soft(card.gravity.value).toHaveText(planet.gravity);
  await expect.soft(card.population.value).toHaveText(planet.population);
}
