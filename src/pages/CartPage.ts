import { Page, Locator } from '@playwright/test';
import { ItemCard } from '@components/ItemCard';
import { CommonActions } from './CommonActions';

export class CartPage extends CommonActions {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async clickCheckoutButton() {
        await this.page.getByTestId('checkout').click();
    }

    async clickContinueShoppingButton() {
        await this.page.getByTestId('continue-shopping').click();
    }

    get cartItems() {
        return this.page.locator('.cart_item');
    }

    async isItemInCart(itemName: string): Promise<boolean> {
        const itemLocator = this.cartItems.filter({ hasText: itemName });
        return await itemLocator.count() > 0;
    }

    async getItemsInCart(): Promise<ItemCard[]> {
        const itemCards: ItemCard[] = [];
        const itemCount = await this.cartItems.count();
        for (let i = 0; i < itemCount; i++) {
            const itemLocator = this.cartItems.nth(i);
            itemCards.push(new ItemCard(this.page, itemLocator));
        }

        return itemCards;
    }
}
