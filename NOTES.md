# Features

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

- POM Classes `home-page.ts`, `register-page.ts` and others located in the `pages` directory.


- User Data Generation using fixtures. User data is generated once per test and made available via the `userData` fixture see `base.test.ts` & `user-generator.ts`.
