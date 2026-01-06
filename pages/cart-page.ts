import { Locator, Page } from "playwright-core";
import { CartItem } from "../models/cart-item";

export class CartPage {
  readonly page: Page;

  readonly $cartTable: Locator;
  readonly $cartItemRows: Locator;
  readonly $updateCartButton: Locator;
  readonly $continueShoppingButton: Locator;
  readonly $checkoutButton: Locator;
  readonly $termsOfServiceCheckbox: Locator;
  readonly $subTotal: Locator;
  readonly $total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$cartTable = page.locator("table.cart");
    this.$cartItemRows = page.locator("tr.cart-item-row");
    this.$updateCartButton = page.locator('input[name="updatecart"]');
    this.$continueShoppingButton = page.locator('input[name="continueshopping"]');
    this.$checkoutButton = page.locator("#checkout");
    this.$termsOfServiceCheckbox = page.locator("#termsofservice");
    this.$subTotal = page.locator(".cart-total-right .product-price").first();
    this.$total = page.locator(".cart-total-right").last();
  }

  public async getCartItems(): Promise<CartItem[]> {
    const itemLocators = await this.$cartItemRows.all();
    return itemLocators.map((locator) => new CartItem(locator));
  }

  public async getCartItemsCount(): Promise<number> {
    return await this.$cartItemRows.count();
  }

  public async updateCart(): Promise<void> {
    await this.$updateCartButton.click();
  }

  public async continueShopping(): Promise<void> {
    await this.$continueShoppingButton.click();
  }

  public async acceptTermsOfService(): Promise<void> {
    await this.$termsOfServiceCheckbox.check();
  }

  public async checkout(): Promise<void> {
    await this.$checkoutButton.click();
  }

  public async getSubTotal(): Promise<number> {
    const subTotalText = await this.$subTotal.textContent();
    return parseFloat(subTotalText || "0");
  }

  public async isCartEmpty(): Promise<boolean> {
    return (await this.getCartItemsCount()) === 0;
  }
}
