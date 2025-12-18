import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/InventoryPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CheckoutPaymentPage } from '@pages/CheckoutPaymentPage';
import { CartPage } from '@pages/CartPage';
import { CompleteOrderPage } from '@pages/CompleteOrderPage';
import { loginAsDefault } from '@utils/helper-action';
import { NON_NUMERIC_REGEX } from '@utils/test-data';

test.beforeEach(async ({ page }) => {
    await loginAsDefault(page);
});

test('Create order with single item', async ({ page }) => {
    const inventory = new InventoryPage(page);

    const itemCards = await inventory.getItemCards();
    await itemCards[0].addToCartButton.click();
    const selectedItemName = await itemCards[0].name.textContent();

    expect((await inventory.headerBar.getTotalItemsInCart()).valueOf()).toBe(1);
    expect(await itemCards[0].removeFromCartButton.isVisible()).toBe(true);

    await inventory.headerBar.clickCartIcon();

    const cart = new CartPage(page);
    let pageTitle = (await cart.pageTitle()).toString();
    expect(pageTitle).toBe('Your Cart');

    const cartItems = await cart.getItemsInCart();
    const cartItemName = await cartItems[0].name.textContent();

    expect(cartItems.length).toBe(1);
    expect(cartItemName).toBe(selectedItemName);

    await cart.clickCheckoutButton();
    const checkout = new CheckoutPage(page);

    pageTitle = (await checkout.pageTitle()).toString();
    expect(pageTitle).toBe('Checkout: Your Information');

    await checkout.fillCheckoutInformation('John', 'Doe', '12345');
    await checkout.clickContinue();

    const checkoutPayment = new CheckoutPaymentPage(page);
    pageTitle = (await checkoutPayment.pageTitle()).toString();
    expect(pageTitle).toBe('Checkout: Overview');

    const checkoutItems = await checkoutPayment.getTotalInventoryAmount();
    const itemTotalValue = parseFloat((await checkoutPayment.itemTotalValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));
    const taxValue = parseFloat((await checkoutPayment.taxValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));
    const subtotalValue = parseFloat((await checkoutPayment.totalPriceValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));

    console.log('Checkout Items Total:', checkoutItems);
    console.log('Item Total Value:', itemTotalValue);
    console.log('Tax Value:', taxValue);
    console.log('Subtotal Value:', subtotalValue);

    expect(checkoutItems).toBeCloseTo(subtotalValue, 2);
    expect(itemTotalValue).toBeCloseTo(subtotalValue + taxValue, 2);

    await checkoutPayment.clickFinish();
    const completeOrder = new CompleteOrderPage(page);

    expect(completeOrder.completeHeader.isVisible()).toBeTruthy();
    expect((await completeOrder.completeHeader.textContent())?.toUpperCase())
        .toContain('THANK YOU FOR YOUR ORDER');
});

test('Create order with multiple items', async ({ page }) => {
    const expectedItemCount = 3;
    const inventory = new InventoryPage(page);
    const addedItemCards = await inventory.addItemToCartByCount(expectedItemCount);
    const selectedItemNames: string[] = [];

    expect((await inventory.headerBar.getTotalItemsInCart()).valueOf()).toBe(expectedItemCount);
    for (const itemCard of addedItemCards) {
        selectedItemNames.push((await itemCard.name.textContent())!);
        expect(await itemCard.removeFromCartButton.isVisible()).toBe(true);
    }

    await inventory.headerBar.clickCartIcon();
    const cart = new CartPage(page);
    let pageTitle = (await cart.pageTitle()).toString();
    expect(pageTitle).toBe('Your Cart');

    const cartItems = await cart.getItemsInCart();

    expect(cartItems.length).toBe(expectedItemCount);
    for (const cartItem of cartItems) {
        const cartItemName = (await cartItem.name.textContent())!;
        expect(selectedItemNames).toContain(cartItemName);
    }

    await cart.clickCheckoutButton();
    const checkout = new CheckoutPage(page);

    pageTitle = (await checkout.pageTitle()).toString();
    expect(pageTitle).toBe('Checkout: Your Information');

    await checkout.fillCheckoutInformation('Defa', 'Ultnama', '12345');
    await checkout.clickContinue();

    const checkoutPayment = new CheckoutPaymentPage(page);
    pageTitle = (await checkoutPayment.pageTitle()).toString();
    expect(pageTitle).toBe('Checkout: Overview');

    const checkoutItems = await checkoutPayment.getTotalInventoryAmount();
    const itemTotalValue = parseFloat((await checkoutPayment.itemTotalValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));
    const taxValue = parseFloat((await checkoutPayment.taxValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));
    const subtotalValue = parseFloat((await checkoutPayment.totalPriceValue.textContent())!
        .replace(NON_NUMERIC_REGEX, ''));

    console.log('Checkout Items Total:', checkoutItems);
    console.log('Item Total Value:', itemTotalValue);
    console.log('Tax Value:', taxValue);
    console.log('Subtotal Value:', subtotalValue);

    expect(checkoutItems).toBeCloseTo(subtotalValue, 2);
    expect(itemTotalValue).toBeCloseTo(subtotalValue + taxValue, 2);

    await checkoutPayment.clickFinish();
    const completeOrder = new CompleteOrderPage(page);

    expect(completeOrder.completeHeader.isVisible()).toBeTruthy();
    expect((await completeOrder.completeHeader.textContent())?.toUpperCase())
        .toContain('THANK YOU FOR YOUR ORDER');
});