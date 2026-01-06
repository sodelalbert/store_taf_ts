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

  public async getProductId(): Promise<number> {
    const idAttr = await this.root.getAttribute("data-productid");
    return idAttr ? parseInt(idAttr) : NaN;
  }

  public async getTitle(): Promise<string> {
    return (await this.$productTitle.textContent()) || "";
  }

  public async getURL(): Promise<string | null> {
    return this.$productURL.getAttribute("href");
  }

  public async getActualPrice(): Promise<number | null> {
    const actualPriceText = await this.$actualPrice.textContent();
    if (!actualPriceText) return null;
    return parseFloat(actualPriceText.replace(/[^0-9.]/g, ""));
  }
}
