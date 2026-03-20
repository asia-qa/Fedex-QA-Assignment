import { SearchPage } from "@pages/search.page";
import { expect } from "@fixtures/fixtures";
import { Person } from "@support/types/person";
import { SEARCH_PAGE_LABELS } from "@constants/search-page-labels";

export async function verifyPeopleDetailsDisplayedCorrectly(
  searchPage: SearchPage,
  peopleData: Person[],
) {
  for (const person of peopleData) {
    await expect
      .soft(searchPage.characterCard.subtitle)
      .toHaveText(person.name);
    await expect
      .soft(searchPage.characterCard.birthYear.value)
      .toHaveText(person.birth_year);
    await expect
      .soft(searchPage.characterCard.eyeColor.value)
      .toHaveText(person.eye_color);
    await expect
      .soft(searchPage.characterCard.gender.value)
      .toHaveText(person.gender);
  }
}

export async function verifyNoResultsDisplayed(searchPage: SearchPage) {
  await expect.soft(searchPage.characterCard.subtitle).toBeHidden();
  await expect.soft(searchPage.noResultsMessage).toBeVisible();
  await expect
    .soft(searchPage.noResultsMessage)
    .toHaveText(SEARCH_PAGE_LABELS.noResultsFoundMessage);
}
