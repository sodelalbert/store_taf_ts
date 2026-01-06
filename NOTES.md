# Features

- [ ] Implement return methods for all the mentods!
- [ ] Type script typing check.
- [x] Consider models for Product Items

- [x] Add assertions to verify search results based on price range
- [ ] Implement next test.
- [ ] Asserts could be replaced with `expect` from Playwright test library.

---

- Clean Code principles applied in POM classes and test files. Inspired by "Clean Code" by Robert C. Martin. Some christmass presnets are just on point! 😊

- Dotenv configuration via `dotenv` package and `.env` file for sensitive data management readiness.

- Custom fixtures `base.test.ts` that provide page objects to tests:

```ts
export const test = base.extend<myFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});
```

- Unique usser data generation per test via `userData` fixture utilizing faker library, see `base.test.ts` & `user-data-generator.ts`.

- POM Classes `search-page.ts`, `home-page.ts`, `register-page.ts` and others located in the `pages` directory.

  - Locators are defined as private members.
  - Each POM class encapsulates interactions with a specific page.
  - Dropdown selections, checkbox interactions, and form fillings are abstracted into methods.
  - Methods include error handling for invalid states (e.g., trying to set price range when advanced search is not enabled).
  - Data management is handled via utility classes like `user-data-generator.ts`.

- Network response handling in `product-item.ts` to ensure actions like adding to cart are confirmed via network responses:

```ts
  public async addToCart() {
    const responsePromise = this.root.page().waitForResponse(
      response => response.url().includes('/addproducttocart/') && response.status() === 200
    );
    await this.$addToCartButton.click();
    await responsePromise;
  }
```
