import { Locator, Page } from "playwright-core";

export class CartPage {
  readonly page: Page;

  readonly cartItemsLocator: Locator;
  readonly quantityLocator: Locator;
  readonly totalPriceLocator: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemsLocator = page.locator('[data-test="cart-item"]');
    this.quantityLocator = page.locator('[data-test="quantity"]');
    this.totalPriceLocator = page.locator('[data-test="total-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.goto("/cart");
  }

  async getProductCount(): Promise<number> {
    return await this.cartItemsLocator.count();
  }

  async getQuantity(): Promise<number> {
    const text = await this.quantityLocator.textContent();
    return parseInt(text || "0");
  }

  async getTotal(): Promise<string> {
    return (await this.totalPriceLocator.textContent()) || "0";
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    return await this.page.locator(`text=${productName}`).isVisible();
  }
}
