import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { users } from '@utils/test-data';
import { loginAs } from '@utils/helper-action';

test('successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginAs(page, users.valid);
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('unsuccessful login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginAs(page, users.invalid);

  const errorMessage = await loginPage.getErrorMessageText();
  expect(errorMessage).toContain('Username and password do not match any user in this service');
});

test('unsuccessful login for locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginAs(page, users.locked_out);

  const errorMessage = await loginPage.getErrorMessageText();
  expect(errorMessage).toContain('Sorry, this user has been locked out.');
});

test('unsuccessful login with empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginAs(page, users.valid);

  const errorMessage = await loginPage.getErrorMessageText();
  expect(errorMessage).toContain('Username is required');
});

test('unsuccessful login with empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginAs(page, users.emptyPassword);

  const errorMessage = await loginPage.getErrorMessageText();
  expect(errorMessage).toContain(' Password is required');
});