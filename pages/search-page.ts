import { Locator, Page } from "playwright-core";
import { SearchCategoriesModel } from "../models/search-categories-model";
import { ProductModel } from "../models/product-model";
import { CartTracker } from "../utils/cart-tracker.";

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

  public async selectCategory(categoryName: SearchCategoriesModel) {
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

  public async getProductDataByName(
    productName: string
  ): Promise<ProductModel> {
    const productLocator = this.page
      .locator(`.product-item:has(.product-title:has-text("${productName}"))`)
      .first();

    const productItem = new ProductItemComponent(productLocator);

    const product: ProductModel = {
      productId: await productItem.getProductId(),
      title: await productItem.getTitle(),
      url: await productItem.getURL(),
      actualPrice: await productItem.getActualPrice(),
      quantity: 0,
    };

    return product;
  }

  public async getAllProductsData(): Promise<ProductModel[]> {
    const productLocators = await this.page.locator(".product-item").all();
    const productItems = productLocators.map(
      (locator) => new ProductItemComponent(locator)
    );

    const productDetailsList: ProductModel[] = [];

    for (const productItem of productItems) {
      const details: ProductModel = {
        productId: await productItem.getProductId(),
        title: await productItem.getTitle(),
        url: await productItem.getURL(),
        actualPrice: await productItem.getActualPrice(),
        quantity: 0,
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
      (response) =>
        response.url().includes("/addproducttocart/") &&
        response.status() === 200
    );

    if (!(await addToCartButton.isVisible())) {
      throw new Error(
        `Add to cart button not found for product: ${productName}`
      );
    }

    this.cartTracker.addProductToTracking(
      await this.getProductDataByName(productName)
    );

    await addToCartButton.click();
    await responsePromise;
  }
}

export class ProductItemComponent {
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

  public async getURL(): Promise<string> {
    const href = await this.$productURL.getAttribute("href");
    return href ?? "";
  }

  public async getActualPrice(): Promise<number> {
    const actualPriceText = await this.$actualPrice.textContent();
    if (!actualPriceText) return NaN;
    return Number(actualPriceText);
  }
}
