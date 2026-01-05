import { Locator, Page } from "playwright-core";
import { ProductItem } from "../models/product-item";

export class SearchCategories {
  static readonly All = "All";
  static readonly Books = "Books";
  static readonly Computers = "Computers";
  static readonly ComputersDesktops = "Computers >> Desktops";
  static readonly ComputersNotebooks = "Computers >> Notebooks";
  static readonly ComputersAccessories = "Computers >> Accessories";
  static readonly Electronics = "Electronics";
  static readonly ElectronicsCameraPhoto = "Electronics >> Camera, photo";
  static readonly ElectronicsCellPhones = "Electronics >> Cell phones";
  static readonly Apparel = "Apparel & Shoes";
  static readonly DigitalDownloads = "Digital downloads";
  static readonly Jewelry = "Jewelry";
  static readonly GiftCards = "Gift Cards";
}

export class SearchPage {
  readonly page: Page;

  readonly $searchTextInput: Locator;
  readonly $searchButton: Locator;
  readonly $advancedSearchCheckbox: Locator;
  readonly $categoryDropdown: Locator;

  readonly $fromPriceInput: Locator;
  readonly $toPriceInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$searchTextInput = page.locator("input[type='text'].search-text");
    this.$searchButton = page.locator(".button-1.search-button");
    this.$advancedSearchCheckbox = page.locator(".basic-search input#As");
    this.$categoryDropdown = page.locator("select#Cid");
    this.$fromPriceInput = page.locator(".price-from");
    this.$toPriceInput = page.locator(".price-to");
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

  public async getSearchResultsList(): Promise<ProductItem[]> {
    const productLocators = await this.page.locator(".product-item").all();
    return productLocators.map((locator) => new ProductItem(locator));
  }

  public async getSearchResultsCount(): Promise<number> {
    return this.page.locator(".product-item").count();
  }

}
