import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:5173", // <-- critical
    trace: "on-first-retry",
  },
  webServer: {
    command: "vite --port 5173", // force consistent port
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
