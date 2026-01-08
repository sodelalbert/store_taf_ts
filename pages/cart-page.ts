import { Locator, Page } from "playwright-core";

export class CartPage {
  readonly page: Page;

  readonly shoppingCartLocator: Locator;
  readonly cartItemsLocator: Locator;
  readonly quantityLocator: Locator;
  readonly totalPriceLocator: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItemsLocator = page.locator('[data-test="cart-item"]');
    this.cartItemsLocator = page.locator("tr.cart-item-row");
    this.quantityLocator = page.locator("input.qty-input");
    this.totalPriceLocator = page.locator("span.product-subtotal");
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.shoppingCartLocator = page.locator("a.ico-cart").first();
  }

  async goto() {
    await this.shoppingCartLocator.click();
  }

  async getQuantityByName(productName: string): Promise<number> {
    const productRow = this.page.locator("tr.cart-item-row").filter({
      has: this.page.locator("a.product-name", { hasText: productName }),
    });
    const input = productRow.locator("input.qty-input");
    const value = await input.inputValue();
    return value ? parseInt(value.trim(), 10) : 0;
  }

  async getTotalByName(productName: string): Promise<number> {
    const productRow = this.page.locator("tr.cart-item-row").filter({
      has: this.page.locator("a.product-name", { hasText: productName }),
    });

    const totalText = await productRow
      .locator("span.product-subtotal")
      .textContent();
    if (!totalText) return 0;

    return Number(totalText);
  }

  async getUnitPriceByName(productName: string): Promise<number> {
    const productRow = this.page.locator("tr.cart-item-row").filter({
      has: this.page.locator("a.product-name", { hasText: productName }),
    });
    return Number(
      (await productRow.locator("span.product-unit-price").textContent()) || "0"
    );
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    const matchingItems = this.cartItemsLocator.filter({
      has: this.page.locator("a.product-name", { hasText: productName }),
    });
    return (await matchingItems.count()) > 0;
  }
}
