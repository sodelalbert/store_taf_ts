import { assert } from "node:console";
import { test } from "../base/base.test.ts";
import { CartPage } from "../pages/cart-page.ts";

test.describe("Add to Cart", () => {
  test("Add products to cart", async ({ homePage, searchPage, cartPage }) => {
    await homePage.goto();
    await homePage.searchFor("laptop");

    const products = await searchPage.getSearchResultsList();

    for (const product of products) {
      await product.addToCart();
    }

    const cartItemCount = await homePage.getCartItemCount();
    test.expect(cartItemCount).toBe(products.length);

    await searchPage.clickShoppingCart();

    const cartItems = await cartPage.getCartItems();

    test.expect(cartItems.length).toBe(products.length);

    // Verify that each product in the cart matches the added products
    // Products added to cart should be tracked during test execution.
  });

  test("Cart Mutations", async ({ homePage }) => {
    await homePage.goto();
  });
});
