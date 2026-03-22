import { SearchPage } from "@pages/search.page";
import { expect } from "@fixtures/fixtures";
import { Person } from "@support/types/person";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";
import { CharacterCardComponent } from "@pages/components/character-card.component";
import { sortByName } from "@utils/sort-by-name.utils";

export async function verifyOrderedPeopleDataDisplayedCorrectly(
  searchPage: SearchPage,
  peopleData: Person[],
) {
  await expect(searchPage.characterCard.rootContainer).toHaveCount(
    peopleData.length,
  );
  const sortedData = sortByName(peopleData);
  const cards = await searchPage.getCharacterCards();
  for (const [index, card] of cards.entries()) {
    await verifyCharacterCard(card, sortedData[index]);
  }
}

export async function verifyNoResultsDisplayed(searchPage: SearchPage) {
  await expect.soft(searchPage.characterCard.rootContainer).toBeHidden();
  await expect.soft(searchPage.loadingMessage).toBeHidden();
  await expect.soft(searchPage.noResultsMessage).toBeVisible();
  await expect
    .soft(searchPage.noResultsMessage)
    .toHaveText(SEARCH_PAGE_LABELS.noResultsFoundMessage);
}

export async function verifyCharacterCard(
  card: CharacterCardComponent,
  person: Person,
) {
  await expect.soft(card.subtitle).toHaveText(person.name);
  await expect.soft(card.birthYear.value).toHaveText(person.birth_year);
  await expect.soft(card.eyeColor.value).toHaveText(person.eye_color);
  await expect.soft(card.gender.value).toHaveText(person.gender);
  await expect.soft(card.skinColor.value).toHaveText(person.skin_color);
}
