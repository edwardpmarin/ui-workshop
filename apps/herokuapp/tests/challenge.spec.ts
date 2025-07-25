    import { test, expect } from '@playwright/test';

    test('should throw a message error when login data is invalid', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'username' }).fill('myUser');
    await page.getByRole('textbox', { name: 'password' }).fill('test password');
    await page.click('button[type="submit"].radius');
    
    await expect(page.locator('div.flash.error', { hasText: 'Your username is invalid!' })).toBeVisible();
    });

    test('should login successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox', { name: 'username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'password' }).fill('SuperSecretPassword!');
    await page.click('button[type="submit"].radius');

    await expect(page.locator('div[data-alert][id="flash"]')).toContainText('You logged into a secure area!');
    await expect(page.getByRole('heading', { name: 'Secure Area', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Welcome to the Secure Area. When you are done click logout below.', level: 4  })).toBeVisible();
    });

    test('logout successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.getByRole('textbox', { name: 'username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'password' }).fill('SuperSecretPassword!');
    await page.click('button[type="submit"].radius');
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('div[data-alert][id="flash"]')).toContainText('You logged out of the secure area!');

    });