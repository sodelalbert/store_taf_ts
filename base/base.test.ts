import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { RegisterPage } from "../pages/register-page";
import { UserDataGenerator } from "../utils/user-data-generator";
import { SearchPage } from "../pages/search-page";

type myFixtures = {
  userData: UserDataGenerator;
  homePage: HomePage;
  registerPage: RegisterPage;
  searchPage: SearchPage;
};

// Extend the base test with custom fixtures

export const test = base.extend<myFixtures>({
  userData: async ({}, use) => {
    await use(new UserDataGenerator());
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

export { expect } from "@playwright/test";
