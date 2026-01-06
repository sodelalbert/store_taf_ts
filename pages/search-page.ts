import { Locator, Page } from "playwright-core";
import { ProductItem } from "./product-item";
import { SearchCategories } from "../models/search-categories";
import { ProductData } from "../models/product-data";
import { CartTracker } from "../utils/cart-tracker.";
import { get } from "node:http";

export class SearchPage {
  readonly page: Page;
  readonly cartTracker: CartTracker;

  readonly $searchTextInput: Locator;
  readonly $searchButton: Locator;
  readonly $advancedSearchCheckbox: Locator;
  readonly $categoryDropdown: Locator;

  readonly $fromPriceInput: Locator;
  readonly $toPriceInput: Locator;

  readonly $shoppingCartLink: Locator;

  constructor(page: Page, cartTracker: CartTracker) {
    this.page = page;
    this.cartTracker = cartTracker;

    this.$searchTextInput = page.locator("input[type='text'].search-text");
    this.$searchButton = page.locator(".button-1.search-button");
    this.$advancedSearchCheckbox = page.locator(".basic-search input#As");
    this.$categoryDropdown = page.locator("select#Cid");
    this.$fromPriceInput = page.locator(".price-from");
    this.$toPriceInput = page.locator(".price-to");
    this.$shoppingCartLink = page.locator("a.ico-cart").first();
  }

  public async enterSearchText(searchText: string) {
    await this.$searchTextInput.fill(searchText);
  }

  public async clickSearchButton() {
    await this.$searchButton.click();
  }

  public async searchForProduct(searchText: string) {
    await this.enterSearchText(searchText);
    await this.clickSearchButton();
  }

  public isAdvancedSearchEnabled() {
    return this.$advancedSearchCheckbox.isChecked();
  }

  public async enableAdvancedSearch() {
    if (!(await this.isAdvancedSearchEnabled())) {
      await this.$advancedSearchCheckbox.check();
    }
  }

  public async selectCategory(categoryName: SearchCategories) {
    if (await this.isAdvancedSearchEnabled()) {
      await this.$categoryDropdown.selectOption({
        label: categoryName.toString(),
      });
    } else {
      throw new Error("Advanced search is not enabled");
    }
  }

  public async getSelectedCategory() {
    if (await this.isAdvancedSearchEnabled()) {
      const selectedValue = await this.$categoryDropdown.inputValue();
      return this.$categoryDropdown
        .locator(`option[value="${selectedValue}"]`)
        .textContent();
    } else {
      throw new Error("Advanced search is not enabled");
    }
  }

  public async setFromPrice(fromPrice: number) {
    if (await this.isAdvancedSearchEnabled()) {
      await this.$fromPriceInput.fill(fromPrice.toString());
    } else {
      throw new Error("Advanced search is not enabled");
    }
  }

  public async setToPrice(toPrice: number) {
    if (await this.isAdvancedSearchEnabled()) {
      await this.$toPriceInput.fill(toPrice.toString());
    } else {
      throw new Error("Advanced search is not enabled");
    }
  }

  public async enterPriceRange(fromPrice: number, toPrice: number) {
    await this.setFromPrice(fromPrice);
    await this.setToPrice(toPrice);
  }

  public async getProductNameList(): Promise<string[]> {
    const productNames = this.page.locator(".product-item .product-title");
    const names = await productNames.allTextContents();
    return names.map((name) => name.trim());
  }

  public async getProductDataByName(productName: string): Promise<ProductData> {
    const productLocator = this.page
      .locator(`.product-item:has(.product-title:has-text("${productName}"))`)
      .first();

    const productItem = new ProductItem(productLocator);

    const details: ProductData = {
      productId: await productItem.getProductId(),
      title: await productItem.getTitle(),
      url: await productItem.getURL(),
      actualPrice: await productItem.getActualPrice(),
      quantity: null,
    };

    return details;
  }

  public async getAllProductsData(): Promise<ProductData[]> {
    const productLocators = await this.page.locator(".product-item").all();
    const productItems = productLocators.map(
      (locator) => new ProductItem(locator)
    );

    const productDetailsList: ProductData[] = [];

    for (const productItem of productItems) {
      const details: ProductData = {
        productId: await productItem.getProductId(),
        title: await productItem.getTitle(),
        url: await productItem.getURL(),
        actualPrice: await productItem.getActualPrice(),
        quantity: null,
      };
      productDetailsList.push(details);
    }
    return productDetailsList;
  }

  public async getProductCount(): Promise<number> {
    return this.page.locator(".product-item").count();
  }

  public async addToCartByName(productName: string): Promise<void> {
    
    const productLocator = this.page.locator(
      `.product-item:has(.product-title a:text-is("${productName}"))`
    );
    const addToCartButton = productLocator.locator(
      "input.product-box-add-to-cart-button[type='button']"
    );

    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/addproducttocart/') && response.status() === 200
    );

    if (!(await addToCartButton.isVisible())) {
      throw new Error(`Add to cart button not found for product: ${productName}`);
    }

    this.cartTracker.addProductToTracking(
      await this.getProductDataByName(productName)
    );

    
    await addToCartButton.click();
    await responsePromise;
  }

}
