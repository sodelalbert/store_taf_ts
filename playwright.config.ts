import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",

  use: {
    headless: process.env.HEADLESS === "true",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
