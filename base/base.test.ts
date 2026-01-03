import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { UserGenerator } from "../utils/user-generator";

type myFixtures = {
  userData: UserGenerator;
  homePage: HomePage;
  registerPage: RegisterPage;
};

// Extend the base test with custom fixtures

export const test = base.extend<myFixtures>({
  userData: async ({}, use) => {
    await use(new UserGenerator());
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect } from "@playwright/test";
