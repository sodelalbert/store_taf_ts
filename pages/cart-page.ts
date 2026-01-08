import { Locator, Page } from 'playwright-core';

export class CartPage {
  readonly page: Page;

  readonly shoppingCartLocator: Locator;
  readonly cartItemsLocator: Locator;
  readonly quantityLocator: Locator;
  readonly totalPriceLocator: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemsLocator = page.locator('tr.cart-item-row');
    this.quantityLocator = page.locator('input.qty-input');
    this.totalPriceLocator = page.locator('span.product-subtotal');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.shoppingCartLocator = page.locator('a.ico-cart').first();
  }

  async goto() {
    await this.shoppingCartLocator.click();
  }

  async getQuantityByName(productName: string): Promise<number> {
    const productRow = this.page.locator('tr.cart-item-row').filter({
      has: this.page.locator('a.product-name', { hasText: productName }),
    });
    const input = productRow.locator('input.qty-input');
    const value = await input.inputValue();
    return value ? parseInt(value.trim(), 10) : 0;
  }

  async getTotalByName(productName: string): Promise<number> {
    const productRow = this.page.locator('tr.cart-item-row').filter({
      has: this.page.locator('a.product-name', { hasText: productName }),
    });

    const totalText = await productRow.locator('span.product-subtotal').textContent();
    return this.parsePrice(totalText);
  }

  async getUnitPriceByName(productName: string): Promise<number> {
    const productRow = this.page.locator('tr.cart-item-row').filter({
      has: this.page.locator('a.product-name', { hasText: productName }),
    });
    const priceText = await productRow.locator('span.product-unit-price').textContent();
    return this.parsePrice(priceText);
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    const matchingItems = this.cartItemsLocator.filter({
      has: this.page.locator('a.product-name', { hasText: productName }),
    });
    return (await matchingItems.count()) > 0;
  }

  private parsePrice(text?: string | null): number {
    if (!text) return 0;
    const cleaned = text
      .replace(/,/g, '')
      .replace(/[^\d().-]+/g, '')
      .trim();
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }
}
