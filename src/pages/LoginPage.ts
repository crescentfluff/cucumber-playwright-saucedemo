import { Page, Locator } from '@playwright/test';
import { CommonActions } from './CommonActions';

export class LoginPage extends CommonActions {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.getByTestId('error');
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submitLogin() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submitLogin();
    }

    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
}