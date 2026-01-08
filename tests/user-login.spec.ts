import assert from 'assert';
import { test } from '../base/base.test';

test.describe('Login / Session', () => {
  test('Login with valid credentials', async ({ page, userData, homePage, registerPage }) => {
    await homePage.goto();
    await homePage.cllickRegister();

    await registerPage.register(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );
    await registerPage.clickContinueButton();

    await page.reload();
    assert.strictEqual(await homePage.getLoggedInUser(), userData.email);

    await homePage.cllickLogout();
    assert.strictEqual(await homePage.getLoggedInUser(), null);
  });
});
