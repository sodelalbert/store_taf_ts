import { strict as assert } from 'node:assert';
import { test } from '../base/base.test';

test.describe('Add to Cart', () => {
  test('Add product to cart & verify', async ({ homePage, searchPage, cartTracker, cartPage }) => {
    await homePage.goto();
    await homePage.searchFor('laptop');

    const searchResultProducts = await searchPage.getAllProductsData();

    for (const product of searchResultProducts) {
      await searchPage.addToCartByName(product.title);
    }

    await cartPage.goto();

    // Verify all products in cartTracker are in the cart with correct quantity.
    for (const product of cartTracker.getAllTrackedProducts()) {
      const isInCart = await cartPage.verifyProductInCart(product.title);
      assert.equal(isInCart, true, `Product ${product.title} should be in the cart`);

      const quantityInCart = await cartPage.getQuantityByName(product.title);
      assert.equal(
        quantityInCart,
        product.quantity,
        `Product ${product.title} should have quantity ${product.quantity} in the cart`
      );

      const priceInCart = await cartPage.getUnitPriceByName(product.title);
      assert.equal(
        priceInCart,
        product.actualPrice,
        `Product ${product.title} should have price ${product.actualPrice} in the cart`
      );

      const totalInCart = await cartPage.getTotalByName(product.title);
      const expectedTotal = product.actualPrice * product.quantity!;
      assert.equal(
        totalInCart,
        expectedTotal,
        `Product ${product.title} should have total ${expectedTotal} in the cart`
      );
    }
  });

  test('Cart Mutations', async ({ homePage }) => {
    await homePage.goto();
  });
});
