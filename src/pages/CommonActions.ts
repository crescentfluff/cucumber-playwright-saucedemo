import { Page, Locator } from "@playwright/test";
import { HeaderBar } from "@components/HeaderBar";
import { timeStamp } from "node:console";

export class CommonActions {
    readonly page: Page;
    readonly headerBar: HeaderBar;

    constructor(page: Page) {
        this.page = page;
        this.headerBar = new HeaderBar(page);
    }

    async navigateToHome() {
        await this.page.goto('/');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async pageTitle(): Promise<string> {
        return (await this.headerBar.headerTitle.textContent()) || '';
    }

    get currentUrl(): string {
        return this.page.url();
    }

}
