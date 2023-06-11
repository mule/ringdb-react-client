import { test, expect } from '@playwright/test';

test('has page title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Yet another ringsdb client/);
});

test('has view heading', async ({ page }) => { 
    const expectedHeaderTitle = 'Yet another ringsdb client'
    await page.goto('/');
    const heading = page.getByRole('heading', { name: expectedHeaderTitle });
    await expect(heading).toContainText(expectedHeaderTitle);

});

test('has deckId input', async ({ page }) => {
    const expectedLabelText = 'Search for a decklist here';
    await page.goto('/');
   const deckIdInputLocator =  page.getByLabel(expectedLabelText);
   await expect(deckIdInputLocator).toBeVisible();
   
  });