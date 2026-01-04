import assert from "assert";
import { test } from "../base/base.test.ts";

test.describe("User Registration", () => {
  test("Succesfull User Registration", async ({
    userData,
    homePage,
    registerPage,
  }) => {
    await homePage.goto();
    await homePage.cllickRegister();

    await registerPage.register(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );

    assert.strictEqual(await registerPage.isUserRegistered(), true);
  });

  test("User Email Validation Test", async ({
    userData,
    homePage,
    registerPage,
  }) => {
    await homePage.goto();
    await homePage.cllickRegister();

    await registerPage.fillFirstName(userData.firstName);
    await registerPage.fillLastName(userData.lastName);
    await registerPage.fillEmail(userData.invalidEmail);
    await registerPage.fillPassword(userData.password);

    const validationErrors = await registerPage.getValidationErrors();

    assert(
      validationErrors.includes("Wrong email"),
      "Expected validation error for invalid email"
    );
  });
});
