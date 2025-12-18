import { Page, Locator } from '@playwright/test';
import { HeaderBar } from '@components/HeaderBar';

export class CompleteOrderPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get completeHeader() {
        return this.page.getByTestId('complete-header');
    }

    get completeText() {
        return this.page.getByTestId('complete-text');
    }

    async isOrderComplete(): Promise<boolean> {
        const headerText = await this.completeHeader.innerText();
        return headerText === 'THANK YOU FOR YOUR ORDER';
    }

    async backToHome() {
        await this.page.getByTestId('back-to-products').click();
    }
}