import { Page, Locator } from '@playwright/test';
import { HeaderBar } from '@components/HeaderBar';
import { CommonActions } from './CommonActions';
import { ItemCard } from '@components/ItemCard';

export class CheckoutPaymentPage extends CommonActions {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get paymentInfoValue() {
        return this.page.getByTestId('payment-info-value');
    }

    get shippingInfoValue() {
        return this.page.getByTestId('shipping-info-value');
    }

    get totalPriceValue() {
        return this.page.getByTestId('subtotal-label');
    }

    get taxValue() {
        return this.page.getByTestId('tax-label');
    }

    get itemTotalValue() {
        return this.page.getByTestId('total-label');
    }

    get inventoryItems() {
        return this.page.getByTestId('inventory-item');
    }

    async getTotalInventoryAmount(): Promise<number> {
        const itemCount = await this.inventoryItems.count();
        let total = 0;

        for (let i = 0; i < itemCount; i++) {
            const item = this.inventoryItems.nth(i);
            let itemCard = new ItemCard(this.page, item);
            const priceText = await itemCard.price.textContent() || '$0';
            const price = parseFloat(priceText.trim().replace('$', ''));
            total += price;
        }
        return total;
    }

    async clickFinish() {
        await this.page.locator('#finish').click();
    }
}