import { test, expect } from '@playwright/test';


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
};


test('Loading hero card shown when deck list is loaded', async ({ page }) => {

    await page.route('**/api/public/decklist/**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockDecklistData)
        });
    });
    

    await page.goto('/');

    const deckIdInputLocator = page.getByLabel('Search for a decklist here');
    await deckIdInputLocator.fill('1');
    await deckIdInputLocator.press("Enter");

    const loadingLocator = page.getByText('Loading hero card');
    const cardsBeingLoaded = await loadingLocator.count();

    expect(cardsBeingLoaded).toBe(3);
});

test('Loading failed shown if fetching card data fails', async ({ page }) => {
    
    await page.route('**/decklist/**', route => {
        
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockDecklistData)
        });
     
    });

    await page.route('**/card/**', route => {

        route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal server error' })
        });
    });
        
        await page.goto('/');
    
        const deckIdInputLocator = page.getByLabel('Search for a decklist here');
        await deckIdInputLocator.fill('1');
        await deckIdInputLocator.press("Enter");

        const loadingLocator = page.getByText('Failed to load data');
        const cardsLoadFailed = await loadingLocator.count();
        expect(cardsLoadFailed).toBe(3);
});

test('Should show hero card data once it is loaded', async ({ page }) => {
    
        await page.route('**/api/public/decklist/**', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockDecklistData)
            });
        });
    
        await page.route('**/api/public/card/**', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({"name": "Mock card data" })  
            });
        });
    
        await page.goto('/');
    
        const deckIdInputLocator = page.getByLabel('Search for a decklist here');
        await deckIdInputLocator.fill('1');
        await deckIdInputLocator.press("Enter");

        await page.screenshot({ path: 'screenshots/heroCards.png' });
    
        const heroCardLocator = await page.getByText('{"name": "Mock card data" }');
        const  cardCount =  await heroCardLocator.count();
        await expect(cardCount).toBe(3);

});

