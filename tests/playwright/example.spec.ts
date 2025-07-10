import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'Introduction', level: 2 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Installing Playwright', level: 2 })).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'Introduction', level: 2 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'How to install Playwright' })).toHaveAttribute('href', '/docs/intro#installing-playwright');

  // Lista
  // await expect(page.getByRole('list', { name: 'Introduction' })).toBeVisible();

//   const expectedLinks = [
//     'Introduction',
//     'Installing Playwright',
//     'What\'s Installed',
//     'Running the Example Test',
//     'HTML Test Reports',
//     'Running the Example Test in UI Mode',
//     'Updating Playwright',
//     'System requirements',
//     'What\'s next'
// ];

// for (const linkText of expectedLinks) {
//     await expect(page.getByRole('link', { name: linkText })).toBeVisible();
// }

});

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.locator('.tabs__item').first().click();
  await page.getByText('init playwright@latest').click();
  await expect(page.getByText('init playwright@latest')).toBeVisible();
});