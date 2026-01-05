import { Locator } from "@playwright/test";

export class ProductItem {
  readonly $productTitle: Locator;
  readonly $productURL: Locator;

  readonly $actualPrice: Locator;
  readonly $oldPrice: Locator;
  readonly $addToCartButton: Locator;

  constructor(private readonly root: Locator) {
    this.$productTitle = this.root.locator(".product-title a");
    this.$productURL = this.root.locator(".product-title a");

    this.$actualPrice = this.root.locator(".prices .actual-price");
    this.$oldPrice = this.root.locator(".prices .old-price");
    this.$addToCartButton = this.root.locator(
      ".product-box-add-to-cart-button"
    );
  }

  public async getTitle() {
    return this.$productTitle.textContent();
  }

  public async getURL() {
    return this.$productURL.getAttribute("href");
  }

  public async getActualPrice() {
    const actualPriceText = await this.$actualPrice.textContent();
    if (!actualPriceText) return null;
    return parseFloat(actualPriceText.replace(/[^0-9.]/g, ""));
  }

  public async getOldPrice() {
    return this.$oldPrice.textContent();
  }

  public async addToCart() {
    await this.$addToCartButton.click();
  }

  public async isActualPriceInPriceRange(minPrice: number, maxPrice: number) {
    const actualPrice = await this.getActualPrice();
    if (actualPrice === null) return false;
    return actualPrice >= minPrice && actualPrice <= maxPrice;
  }
}
