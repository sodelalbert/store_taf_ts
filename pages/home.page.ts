import { Locator, Page } from "playwright-core";

export class HomePage {
  public url = process.env.BASE_URL;
  readonly page: Page;

  readonly $registerLink: Locator;
  readonly $loginLink: Locator;
  readonly $shpingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$registerLink = page.locator("a.ico-register");
    this.$loginLink = page.locator("a.ico-login");
    this.$shpingCartLink = page.locator("a.ico-cart");
  }

  public async goto() {
    await this.page.goto(this.url!);
  }

  public async goToRegisterPage() {
    await this.$registerLink.click();
  }

  public async goToLoginPage() {
    await this.$loginLink.click();
  }

  public async goToShoppingCartPage() {
    await this.$shpingCartLink.click();
  }
}
