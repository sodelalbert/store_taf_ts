import { Locator, Page } from 'playwright-core';

export class HomePage {
  public url = process.env.BASE_URL;
  readonly page: Page;

  readonly $registerLink: Locator;
  readonly $loginLink: Locator;
  readonly $logoutLink: Locator;
  readonly $shoppingCartLink: Locator;
  readonly $shoppingCartQuantity: Locator;

  readonly $loggedInUserAccount: Locator;

  readonly $searchBox: Locator;
  readonly $searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$registerLink = page.locator('a.ico-register');
    this.$loginLink = page.locator('a.ico-login');
    this.$logoutLink = page.locator('a.ico-logout');
    this.$shoppingCartLink = page.locator('a.ico-cart');
    this.$shoppingCartQuantity = this.$shoppingCartLink.locator('.cart-qty');

    this.$loggedInUserAccount = page.locator('.header-links a.account').first();

    this.$searchBox = page.locator('input#small-searchterms');
    this.$searchButton = page.locator('input.button-1.search-box-button');
  }

  public async goto(): Promise<void> {
    await this.page.goto(this.url!);
  }

  public async cllickRegister(): Promise<void> {
    await this.$registerLink.click();
  }

  public async cllickLogin(): Promise<void> {
    await this.$loginLink.click();
  }

  public async cllickLogout(): Promise<void> {
    await this.$logoutLink.click();
  }

  public async cllickShoppingCart(): Promise<void> {
    await this.$shoppingCartLink.click();
  }

  public async getLoggedInUser(): Promise<string | null> {
    if (await this.$loggedInUserAccount.isVisible()) {
      return await this.$loggedInUserAccount.textContent();
    }
    return null;
  }

  public async searchFor(searchPhrase: string): Promise<void> {
    await this.$searchBox.fill(searchPhrase);
    await this.$searchButton.click();
  }

  public async getCartItemCount(): Promise<number> {
    const cartText = await this.$shoppingCartQuantity.textContent();
    if (!cartText) return 0;
    const match = cartText.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
