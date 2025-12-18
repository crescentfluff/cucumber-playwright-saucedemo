import { Page, Locator } from '@playwright/test';
const defaultValue = 'N/A';

export class ItemCard {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.root = root;
    }

    get name(): Locator {
        return this.root.getByTestId('inventory-item-name') || defaultValue;
    }

    get description(): Locator {
        return this.root.getByTestId('inventory-item-desc');
    }

    get price(): Locator {
        return this.root.getByTestId('inventory-item-price');
    }

    get addToCartButton(): Locator {
        return this.root.getByText('Add to cart') || defaultValue;
    }

    get removeFromCartButton(): Locator {
        return this.root.getByText('Remove') || defaultValue;
    }
}