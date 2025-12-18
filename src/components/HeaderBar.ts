import { Page, Locator } from '@playwright/test';

export class HeaderBar {
    readonly page: Page;
    readonly primaryHeader: Locator;
    readonly secondaryHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeader = page.getByTestId('primary-header');
        this.secondaryHeader = page.getByTestId('secondary-header');
    }

    get headerTitle(): Locator {
        return this.secondaryHeader.locator('.title');
    }

    get shoppingCart(): Locator {
        return this.primaryHeader.locator('.shopping_cart_link');
    }

    async goToCart() {
        await this.shoppingCart.click();
    }

    async getTotalItemsInCart(): Promise<number> {
        const itemCountLocator = this.primaryHeader.locator('.shopping_cart_badge');
        const itemCountText = await itemCountLocator.textContent();
        return itemCountText ? parseInt(itemCountText, 10) : 0;
    }

    async clickCartIcon() {
        await this.primaryHeader.locator('//a[@class="shopping_cart_link"]').click();
    }

    async clickMenuButton() {
        await this.primaryHeader.getByAltText('Open Menu').click();
    }

    async clickCloseMenuButton() {
        await this.primaryHeader.getByAltText('Close Menu').click();
    }

    async clickLogoutLink() {
        await this.primaryHeader.getByText('Logout').click();
    }

    async clickAllItemsLink() {
        await this.primaryHeader.getByText('All Items').click();
    }
}