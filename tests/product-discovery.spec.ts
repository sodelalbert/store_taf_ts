import assert from "assert";
import { test } from "../base/base.test.ts";
import { SearchCategories } from "../pages/search-page.ts";

test.describe("Product Discovery", () => {
  test("Search and filter", async ({ homePage, searchPage }) => {
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

    const priceMin = 20;
    const priceMax = 100;

    await searchPage.enterPriceRange(priceMin, priceMax);
    await searchPage.clickSearchButton();

    // Verify that search results are within the specified price range
    const products = await searchPage.getSearchResultsList();

    for (const product of products) {
      assert(await product.isActualPriceInPriceRange(priceMin, priceMax));
    }
  });

  test("Search and filter - Filter no results", async ({
    homePage,
    searchPage,
  }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    await searchPage.enableAdvancedSearch();

    await searchPage.enterPriceRange(20, 21);
    await searchPage.clickSearchButton();

    let products = await searchPage.getSearchResultsList();
    assert.strictEqual(
      products.length,
      0,
      "Expected no products to be found in the search results"
    );
  });

  test("Browse through categories", async ({ homePage, searchPage }) => {
    await homePage.goto();
  });
});
