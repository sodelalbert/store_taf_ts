import { assert } from "node:console";
import { test } from "../base/base.test.ts";
import { access } from "node:fs";

test.describe("Add to Cart", () => {
  test("Add product to cart from search results - verify name, price, quantity", async ({
    homePage,
    searchPage,
  }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    const products = await searchPage.getSearchResultsList();

    for (const product of products) {
      await product.addToCart();
    }
  });

  test("Cart Mutations", async ({ homePage }) => {
    await homePage.goto();
  });
});
