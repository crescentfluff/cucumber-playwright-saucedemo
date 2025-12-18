import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/InventoryPage';
import { loginAsDefault } from '@utils/helper-action';

test.beforeEach(async ({ page }) => {
    await loginAsDefault(page);
});

test('Verify product sorting by Price (low to high)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');

    const itemCards = await inventoryPage.getItemCards();
    const prices = await Promise.all(itemCards.map(async (item) => {
        return parseFloat((await item.price.textContent())!);
    }));

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});

test('Verify product sorting by Price (high to low)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('hilo');

    const itemCards = await inventoryPage.getItemCards();
    const prices = await Promise.all(itemCards.map(async (item) => {
        return parseFloat((await item.price.textContent())!.replace('$', ''));
    }));

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
});

test('Verify product sorting by Product name (A to Z)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');

    const itemCards = await inventoryPage.getItemCards();
    const prices = await Promise.all(itemCards.map(async (item) => {
        return await item.name.textContent();
    }));

    const sortedPrices = [...prices].sort((a, b) => a!.localeCompare(b!));
    expect(prices).toEqual(sortedPrices);
});

test('Verify product sorting by Product name (Z to A)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');

    const itemCards = await inventoryPage.getItemCards();
    const prices = await Promise.all(itemCards.map(async (item) => {
        return await item.name.textContent();
    }));

    const sortedPrices = [...prices].sort((b, a) => a!.localeCompare(b!));
    expect(prices).toEqual(sortedPrices);
});