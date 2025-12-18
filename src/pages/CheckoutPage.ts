import { HeaderBar } from '@components/HeaderBar';
import { Page, Locator } from '@playwright/test';
import { CommonActions } from './CommonActions';

export class CheckoutPage extends CommonActions {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get FirstNameInput() {
        return this.page.getByTestId('firstName');
    }

    get LastNameInput() {
        return this.page.getByTestId('lastName');
    }

    get PostalCodeInput() {
        return this.page.getByTestId('postalCode');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.FirstNameInput.fill(firstName);
        await this.LastNameInput.fill(lastName);
        await this.PostalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.page.locator('#continue').click();
    }

    async clickCancel() {
        await this.page.locator('#cancel').click();
    }
}
