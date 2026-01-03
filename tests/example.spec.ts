import assert from "assert";
import { test } from "../base/base.test.ts";

test("has title", async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.goToRegisterPage();
});
