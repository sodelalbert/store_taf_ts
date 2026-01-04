import assert from "assert";
import { test } from "../base/base.test.ts";
import { SearchCategories } from "../pages/search-page.ts";

test.describe("Product Discovery", () => {
  test("Search Page Basic Operations", async ({
    page,
    homePage,
    searchPage,
  }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    await searchPage.searchForProduct("Fiction");
    assert(
      !(await searchPage.isAdvancedSearchEnabled()),
      "Advanced search should not be enabled"
    );

    await searchPage.enableAdvancedSearch();
    assert(
      await searchPage.isAdvancedSearchEnabled(),
      "Advanced search should be enabled"
    );

    await searchPage.selectCategory(SearchCategories.Books);
    await searchPage.clickSearchButton();

    const selectedCategory = await searchPage.getSelectedCategory();
    assert.strictEqual(
      selectedCategory,
      SearchCategories.Books,
      `Expected selected category to be '${SearchCategories.Books}' but got '${selectedCategory}'`
    );

    await searchPage.setFromPrice(10);
    await searchPage.setToPrice(50);
    await searchPage.clickSearchButton();

    await searchPage.enterPriceRange(20, 100);
    await searchPage.clickSearchButton();

    // TODO: Add assertions to verify search results based on price range
  });

  test("Search and filter", async ({ page, homePage, searchPage }) => {
    await homePage.goto();
  });

  test("Browse categories", async ({ page, homePage, searchPage }) => {
    await homePage.goto();
  });
});
