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
    const deckIdInputLocator = page.getByLabel(expectedLabelText);
    await expect(deckIdInputLocator).toBeVisible();
});

test('should notify user when loading decklist data', async ({ page }) => {
    await page.goto('/');

    const deckIdInputLocator = page.getByLabel('Search for a decklist here');
    await deckIdInputLocator.fill('1');
    await deckIdInputLocator.press("Enter");

    const loadingLocator = await page.getByText('Loading deck list');


    await expect(loadingLocator).toBeVisible();
});

test('should show decklist data when it  is loaded', async ({ page }) => {

    page.route('**/decklist/1.json?_format=json', async route => {

        await route.fulfill({
            status: 200,
            body: JSON.stringify({ data: 'Mocked response' }),
        });

    });

    await page.goto('/');

    const deckIdInputLocator = page.getByLabel('Search for a decklist here');
    await deckIdInputLocator.fill('1');
    await deckIdInputLocator.press("Enter");

    await page.waitForResponse('**/decklist/1.json?_format=json');
    const decklistDataLocator = await page.getByText('Mocked response');
    await expect(decklistDataLocator).toBeVisible();

});

test('should show error message when decklist data fails to load', async ({ page }) => {
    page.route('**/decklist/1000.json?_format=json', async route => {

        await route.fulfill({
            status: 500,
            body: JSON.stringify({ data: 'Mocked response' }),

        });

    });

    await page.goto('/');

    const deckIdInputLocator = page.getByLabel('Search for a decklist here');
    await deckIdInputLocator.fill('1000');
    await deckIdInputLocator.press("Enter");
    await page.waitForResponse('**/decklist/1000.json?_format=json');
    const errorLocator = await page.getByText('Failed to load data');
    await expect(errorLocator).toBeVisible();
});

