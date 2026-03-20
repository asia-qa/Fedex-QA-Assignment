import { test, expect } from "@fixtures/fixtures";

test.describe("Radio Button Visual Test", () => {
  test.beforeEach(async ({ searchPage }) => {
    await test.step("Verify radio buttons initial state", async () => {
      await expect(searchPage.searchCard.peopleRadioButton).toBeChecked();
      await expect(searchPage.searchCard.planetsRadioButton).not.toBeChecked();
    });
  });

  test("Verify unselected radio button state", async ({ searchPage }) => {
    await expect(searchPage.searchCard.planetsRadioButton).toHaveScreenshot();
  });

  test("Verify unselected radio button in hover state", async ({
    searchPage,
  }) => {
    await searchPage.searchCard.planetsRadioButton.hover();
    await expect(searchPage.searchCard.planetsRadioButton).toHaveScreenshot();
  });

  test("Verify selected radio button state", async ({ searchPage }) => {
    await expect(searchPage.searchCard.peopleRadioButton).toHaveScreenshot();
  });

  test("Verify selected radio button hover state", async ({ searchPage }) => {
    await searchPage.searchCard.peopleRadioButton.hover();
    await expect(searchPage.searchCard.peopleRadioButton).toHaveScreenshot();
  });
});
