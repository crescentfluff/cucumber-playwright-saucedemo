import { Page, Locator } from '@playwright/test';
import { HeaderBar } from '@components/HeaderBar';
import { ItemCard } from '@components/ItemCard';
import { count } from 'node:console';
import { CommonActions } from './CommonActions';

export class InventoryPage extends CommonActions {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get sortDropdown() {
        return this.page.locator('.product_sort_container');
    }

    get inventoryItems() {
        return this.page.locator('.inventory_item');
    }

    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async addItemToCartByCount(count: number): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = await this.getItemCards() || [];
        const addedItemCards: ItemCard[] = [];

        for (let i = 0, max = itemCards.length; i < count && i < max; i++) {
            await itemCards[i].addToCartButton.click();
            addedItemCards.push(itemCards[i]);
        }

        return addedItemCards;
    }


    async getItemCards(): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = [];
        const countItems = await this.inventoryItems.count();

        for (let i = 0; i < countItems; i++) {
            const card = this.inventoryItems.nth(i);
            itemCards.push(new ItemCard(this.page, card));
        }

        return itemCards;
    }
}