import { test } from "../base/base.test.ts";

test.describe("Login / Session", () => {
  test("Login with valid credentials", async ({
    userData,
    homePage,
    registerPage,
  }) => {
    await homePage.goto();
    await homePage.goToRegisterPage();

    await registerPage.register(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );
    await registerPage.clickContinueButton();
    await registerPage.page.reload();
  });
});
