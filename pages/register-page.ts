import { Locator, Page } from "playwright-core";

export class RegisterPage {
  readonly page: Page;

  readonly $genderMaleRadio: Locator;
  readonly $firstNameInput: Locator;
  readonly $lastNameInput: Locator;
  readonly $emailInput: Locator;

  readonly $passwordInput: Locator;
  readonly $confirmPasswordInput: Locator;

  readonly $registerButton: Locator;

  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.$genderMaleRadio = page.locator("input#gender-male");
    this.$firstNameInput = page.locator("input#FirstName");
    this.$lastNameInput = page.locator("input#LastName");
    this.$emailInput = page.locator("input#Email");

    this.$passwordInput = page.locator("input#Password");
    this.$confirmPasswordInput = page.locator("input#ConfirmPassword");

    this.$registerButton = page.locator("input#register-button");

    this.continueButton = page.locator(".button-1.register-continue-button");
  }

  public async selectGenderMale(): Promise<void> {
    await this.$genderMaleRadio.click();
  }

  public async fillFirstName(firstName: string): Promise<void> {
    await this.$firstNameInput.fill(firstName);
  }

  public async fillLastName(lastName: string): Promise<void> {
    await this.$lastNameInput.fill(lastName);
  }

  public async fillEmail(email: string): Promise<void> {
    await this.$emailInput.fill(email);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.$passwordInput.fill(password);
  }

  public async fillConfirmPassword(password: string): Promise<void> {
    await this.$confirmPasswordInput.fill(password);
  }

  public async clickRegisterButton(): Promise<void> {
    await this.$registerButton.click();
  }

  public async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  public async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.selectGenderMale();
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.clickRegisterButton();
  }

  public async isUserRegistered(): Promise<boolean> {
    const resultLocator = this.page.locator("div.result", {
      hasText: "Your registration completed",
    });
    return await resultLocator.isVisible();
  }

  public async getValidationErrors(): Promise<string[]> {
    const errors = this.page.locator("span.field-validation-error");
    const errorMessages: string[] = [];
    const count = await errors.count();
    for (let i = 0; i < count; i++) {
      errorMessages.push(await errors.nth(i).innerText());
    }
    return errorMessages;
  }

  public async isValidationSuccessful(): Promise<boolean> {
    const errors = await this.getValidationErrors();
    return errors.length === 0;
  }
}
