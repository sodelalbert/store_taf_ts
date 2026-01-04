import { Locator, Page } from "playwright-core";

export class HomePage {
  public url = process.env.BASE_URL;
  readonly page: Page;

  readonly $registerLink: Locator;
  readonly $loginLink: Locator;
  readonly $logoutLink: Locator;
  readonly $shoppingCartLink: Locator;

  readonly $loggedInUserAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$registerLink = page.locator("a.ico-register");
    this.$loginLink = page.locator("a.ico-login");
    this.$logoutLink = page.locator("a.ico-logout");
    this.$shoppingCartLink = page.locator("a.ico-cart");

    this.$loggedInUserAccount = page.locator(".header-links a.account").first();
  }

  public async goto() {
    await this.page.goto(this.url!);
  }

  public async cllickRegister() {
    await this.$registerLink.click();
  }

  public async cllickLogin() {
    await this.$loginLink.click();
  }

  public async cllickLogout() {
    await this.$logoutLink.click();
  }

  public async cllickShoppingCart() {
    await this.$shoppingCartLink.click();
  }

  public async getLoggedInUser() {
    if (await this.$loggedInUserAccount.isVisible()) {
      return this.$loggedInUserAccount.textContent();
    }
    return null;
  }
}
