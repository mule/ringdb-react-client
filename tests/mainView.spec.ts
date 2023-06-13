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

test('should show decklist data when it is loaded', async ({ page }) => {

    const mockDecklistData = {
        "id": 1,
        "name": "testing deck1",
        "date_creation": "2018-09-10T13:19:13-03:00",
        "date_update": "2018-09-11T12:12:21-03:00",
        "description_md": "testing deck, what else to say",
        "user_id": 7670,
        "heroes": {
            "001002": 1,
            "001003": 1,
            "001004": 1
        },
        "slots": {
            "001002": 1,
            "001003": 1,
            "001004": 1,
            "001013": 2,
            "001014": 2,
            "001016": 1,
            "001021": 2,
            "001025": 2,
            "001026": 2,
            "001028": 2,
            "001029": 2,
            "001031": 2,
            "001034": 2,
            "001036": 2,
            "002009": 2,
            "002013": 2,
            "002014": 1,
            "002018": 2,
            "002019": 1,
            "003004": 1
        },
        "sideslots": [],
        "version": "1.0",
        "is_published": true,
        "nb_votes": 1,
        "nb_favorites": 1,
        "nb_comments": 3,
        "starting_threat": 27
    }

    page.route('**/decklist/1.json?_format=json', async route => {

        await route.fulfill({
            status: 200,
            body: JSON.stringify(mockDecklistData),
        });

    });

    await page.goto('/');

    const deckIdInputLocator = page.getByLabel('Search for a decklist here');
    await deckIdInputLocator.fill('1');
    await deckIdInputLocator.press("Enter");

    await page.waitForResponse('**/decklist/1.json?_format=json');
    const heroCard1DataLocator = await page.getByText('001002');
    const heroCard2DataLocator = await page.getByText('001003');
    const heroCard3DataLocator = await page.getByText('001004');

    await expect(heroCard1DataLocator.first()).toBeVisible();
    await expect(heroCard2DataLocator.first()).toBeVisible();
    await expect(heroCard3DataLocator.first()).toBeVisible();

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

