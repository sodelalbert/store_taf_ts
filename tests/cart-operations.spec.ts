import { strict as assert } from "node:assert";
import { test } from "../base/base.test.ts";

test.describe("Add to Cart", () => {
  test("Add product to cart from search results - verify name, price, quantity", async ({
    homePage,
    searchPage,
    cartTracker,
  }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    const searchResultProducts = await searchPage.getAllProductsData();

    for (const product of searchResultProducts) {
      await searchPage.addToCartByName(product.title);
    }

    // Implement cart-page.ts and CartPage class
    // Get quantity, price, total, by product name
    // Go to cart
    // 

    // Think only if 



    const a = await cartTracker.getTrackedProductById(searchResultProducts[0].productId);
    const b = await cartTracker.getTrackedProductByName(searchResultProducts[0].title);

    assert.deepStrictEqual(a, b);
    
  });

  test("Cart Mutations", async ({ homePage }) => {
    await homePage.goto();
  });
});
