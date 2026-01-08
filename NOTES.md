# Features

- [x] Review Implemented code and refine implementation.
- [ ] Implement return methods for all the mentods!
- [ ] Type script typing check.

  **Missing Tests**

- [ ] Product Discovery — Path B (Browse / Category / Featured)
- [ ] Cart Mutations test

---

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

- Network response handling in `search-page.ts` to ensure actions like adding to cart are confirmed via network responses:

```ts
  public async addToCartByName(productName: string): Promise<void> {

    ...

    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/addproducttocart/') && response.status() === 200
    );

    ...

    await addToCartButton.click();
    await responsePromise; // Wait for the network response to confirm the action.
  }
```

- `ProductData` class is used to structure product information consistently across methods and tests. Product Data objects are used to verify search results and other product-related functionalities i.e cart content.

- `CartTracker` class keeps track of products added to cart during tests for verification purposes. CartTracker is added as fixture in `base.test.ts` - same instance per test execution for all pages. Shared object between pages and tests helps to verify cart contents easily.
