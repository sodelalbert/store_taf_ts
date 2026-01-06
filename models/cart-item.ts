import { Locator } from "@playwright/test";

export class CartItem {
  getTitle() {
    throw new Error("Method not implemented.");
  }
  readonly $removeCheckbox: Locator;
  readonly $productPicture: Locator;
  readonly $productName: Locator;
  readonly $unitPrice: Locator;
  readonly $quantityInput: Locator;
  readonly $subtotal: Locator;
  readonly $attributes: Locator;

  constructor(private readonly root: Locator) {
    this.$removeCheckbox = this.root.locator('input[name="removefromcart"]');
    this.$productPicture = this.root.locator(".product-picture img");
    this.$productName = this.root.locator(".product-name");
    this.$unitPrice = this.root.locator(".product-unit-price");
    this.$quantityInput = this.root.locator(".qty-input");
    this.$subtotal = this.root.locator(".product-subtotal");
    this.$attributes = this.root.locator(".attributes");
  }

  public async getProductName(): Promise<string> {
    return (await this.$productName.textContent()) || "";
  }

  public async getProductUrl(): Promise<string> {
    return (await this.$productName.getAttribute("href")) || "";
  }

  public async getUnitPrice(): Promise<number> {
    const priceText = await this.$unitPrice.textContent();
    return parseFloat(priceText || "0");
  }

  public async getQuantity(): Promise<number> {
    const quantity = await this.$quantityInput.inputValue();
    return parseInt(quantity || "0", 10);
  }

  public async setQuantity(quantity: number): Promise<void> {
    await this.$quantityInput.fill(quantity.toString());
  }

  public async getSubtotal(): Promise<number> {
    const subtotalText = await this.$subtotal.textContent();
    return parseFloat(subtotalText || "0");
  }

  public async getAttributes(): Promise<string | null> {
    const attributesCount = await this.$attributes.count();
    if (attributesCount > 0) {
      return await this.$attributes.textContent();
    }
    return null;
  }

  public async remove(): Promise<void> {
    await this.$removeCheckbox.check();
  }

  public async isMarkedForRemoval(): Promise<boolean> {
    return await this.$removeCheckbox.isChecked();
  }

  public async getImageUrl(): Promise<string> {
    return (await this.$productPicture.getAttribute("src")) || "";
  }
}
