# Features

- POM
- Custom fixtures `base.test.ts`

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

- CI/CD integration
