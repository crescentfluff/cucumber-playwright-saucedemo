import { Page } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { users } from "./test-data";

export async function loginAs(page: Page, user = users.valid) {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    await loginPage.login(user.username, user.password);
}

export async function loginAsDefault(page: Page) {
    await loginAs(page, users.valid);
}