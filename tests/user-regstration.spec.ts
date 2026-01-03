import assert from "assert";
import { test } from "../base/base.test.ts";
import { UserGenerator } from "../utils/user.generator.ts";

test.describe("User Registration", () => {
  test("Succesfull User Registration", async ({ homePage, registerPage }) => {
    await homePage.goto();
    await homePage.goToRegisterPage();

    await registerPage.register(
      UserGenerator.generateFirstName(),
      UserGenerator.generateLastName(),
      UserGenerator.generateEmail(),
      UserGenerator.generatePassword()
    );

    assert.strictEqual(
      await registerPage.isValidationSuccessful(),
      true,
      "Validation errors should not be present"
    );
  });

  test("User Email Validation Test", async ({ homePage, registerPage }) => {
    await homePage.goto();
    await homePage.goToRegisterPage();

    await registerPage.fillFirstName(UserGenerator.generateFirstName());
    await registerPage.fillLastName(UserGenerator.generateLastName());
    await registerPage.fillEmail(UserGenerator.generateInvalidEmail());
    await registerPage.fillPassword(UserGenerator.generatePassword());

    const errors = await registerPage.getValidationErrors();

    assert.ok(
      errors.includes("Wrong email"),
      "Expected validation error for invalid email"
    );
  });
});
