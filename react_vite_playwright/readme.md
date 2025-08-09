#### Init playwright

`npm init playwright@latest`

#### Config For The playwright

```
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
```

#### Example Test File

```
import { test, expect } from "@playwright/test";

test("fetches and shows JSON, and component exists after API call", async ({ page }) => {
  await page.goto("/");

  // The component (button) should exist from the start
  const button = page.getByTestId("fetch-button");
  await expect(button).toBeVisible();

  // Click it to fetch
  await button.click();

  // Wait for JSON to appear (we assert a stable field)
  const output = page.getByTestId("json-output");
  await expect(output).toContainText('"id": 1');

  // Sanity: the component still exists after the API call
  await expect(button).toBeVisible();
});
```
