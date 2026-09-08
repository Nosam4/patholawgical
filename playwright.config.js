import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:4174/patholawgical/", browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: "npm run preview -- --port 4174 --strictPort",
    url: "http://127.0.0.1:4174/patholawgical/",
    reuseExistingServer: !process.env.CI,
  },
});
