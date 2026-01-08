import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { RegisterPage } from '../pages/register-page';
import { UserDataGenerator } from '../utils/user-data-generator';
import { SearchPage } from '../pages/search-page';
import { CartTracker } from '../utils/cart-tracker.';
import { CartPage } from '../pages/cart-page';

type myFixtures = {
  userData: UserDataGenerator;
  homePage: HomePage;
  registerPage: RegisterPage;
  searchPage: SearchPage;
  cartTracker: CartTracker;
  cartPage: CartPage;
};

// Extend the base test with custom fixtures

export const test = base.extend<myFixtures>({
  // eslint-disable-next-line no-empty-pattern
  cartTracker: async ({}, use) => {
    await use(new CartTracker());
  },
  // eslint-disable-next-line no-empty-pattern
  userData: async ({}, use) => {
    await use(new UserDataGenerator());
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  searchPage: async ({ page, cartTracker }, use) => {
    await use(new SearchPage(page, cartTracker));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
