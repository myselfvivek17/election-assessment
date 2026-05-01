import { test, expect } from "@playwright/test";

test.describe("Basic Navigation & Localization", () => {
  test("should load the home page and show the welcome message", async ({ page }) => {
    await page.goto("/");
    // By default it should be Hindi as per LangProvider initial state
    await expect(page.locator("h1")).toContainText("नमस्ते");
  });

  test("should switch language to English", async ({ page }) => {
    await page.goto("/");
    
    // Find the language toggle (assuming it's accessible or has a specific text)
    // In our app, we have a language switcher in the AppShell
    await page.click('button:has-text("English"), button:has-text("EN")');
    
    // Check if the title changed to English
    await expect(page.locator("h1")).toContainText("Namaste");
  });

  test("should navigate to register page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/register"]');
    await expect(page).toHaveURL("/register");
  });
});
