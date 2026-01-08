import assert from "assert";
import { expect, test } from "../base/base.test.ts";
import { SearchCategoriesModel } from "../models/search-categories-model.ts";

test.describe("Product Discovery", () => {
  test("Search and filter", async ({ homePage, searchPage }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    await searchPage.searchForProduct("Fiction");
    expect(await searchPage.isAdvancedSearchEnabled()).toBeFalsy();

    await searchPage.enableAdvancedSearch();
    expect(await searchPage.isAdvancedSearchEnabled()).toBeTruthy();

    await searchPage.selectCategory(SearchCategoriesModel.Books);
    await searchPage.clickSearchButton();

    const selectedCategory = await searchPage.getSelectedCategory();
    expect(selectedCategory).toBe(SearchCategoriesModel.Books.toString());
    const priceMin = 20;
    const priceMax = 100;

    await searchPage.enterPriceRange(priceMin, priceMax);
    await searchPage.clickSearchButton();

    // Verify that search results are within the specified price range
    const allProducts = await searchPage.getAllProductsData();
    for (const product of allProducts) {
      if (product.actualPrice !== null) {
        expect(product.actualPrice).toBeGreaterThanOrEqual(priceMin);
        expect(product.actualPrice).toBeLessThanOrEqual(priceMax);
      }
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

    let products = await searchPage.getProductCount();
    assert.strictEqual(
      products,
      0,
      "Expected no products to be found in the search results"
    );
  });

  test("Browse through categories", async ({ homePage, searchPage }) => {
    await homePage.goto();
  });
});
