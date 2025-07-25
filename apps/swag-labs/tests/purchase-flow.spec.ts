import { test, expect, Page } from "@playwright/test";
import baseUrl from "../../../config/dev";
import { LoginPage } from "@swag-labs/pages/LoginPage";

test.describe.configure({ mode: "serial" });
test.describe("Shopping Cart Testing should login into the page with a valid user and password", () => {
  let page: Page;
  const baseUrl = process.env.BASE_URL;
  const username = process.env.SWAG_LABS_VALID_USERNAME;
  const password = process.env.SWAG_LABS_VALID_PASSWORD;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    //Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);
    await loginPage.expectAppLogoVisible();
  });

  test("then should show the main page", async () => {
    // Title
    await page.goto(`${baseUrl}/inventory.html`);
    await expect(page.locator("div.app_logo")).toBeVisible();

    //Dropdown
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(
      page.locator('[data-test="product-sort-container"]')
    ).toBeVisible();
    await expect(sortDropdown).toBeVisible();
    await expect(sortDropdown).toBeEnabled();
    await expect(sortDropdown).toHaveValue("az");
    await expect(sortDropdown.locator("option")).toHaveCount(4);

    await sortDropdown.selectOption("lohi"); // Select by value
    await expect(sortDropdown).toHaveValue("lohi");
    await expect(sortDropdown).toContainText("Price (low to high)");

    // await expect(sortDropdown).toHaveValue('za');
    // await expect(sortDropdown).toHaveValue('lohi');
    // await expect(sortDropdown).toHaveValue('hilo');
    // await expect(sortDropdown).toHaveCount(4);
    await expect(sortDropdown).toContainText("Name (A to Z)");
    await expect(sortDropdown).toContainText("Name (Z to A)");
    await expect(sortDropdown).toContainText("Price (low to high)");
    await expect(sortDropdown).toContainText("Price (high to low)");
  });

  test("then should add and remove products into the cart", async () => {
    await page.goto(`${baseUrl}/inventory.html`);
    await expect(page.locator("div.app_logo")).toBeVisible();
    //Add products to cart
    //From button
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //From button
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    //Remove product from cart
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    //Check product
    await page
      .locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]')
      .click();
    //Add to cart
    await page.locator('[data-test="add-to-cart"]').click();
    //Back to car
    await page.locator('[data-test="back-to-products"]').click();
    //Validate cart icon
    const cartIcon = page.locator(".shopping_cart_link");
    await expect(cartIcon).toBeVisible();
    await expect(cartIcon).toHaveText("2");
  });
  test("then should complete the purchase in the cart view", async () => {
    await page.goto(`${baseUrl}/inventory.html`);
    await expect(page.locator("div.app_logo")).toBeVisible();
    //Go to cart
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator("div.cart_list")).toBeVisible();
    const cartListContainer = page.locator('[data-test="cart-list"]');
    const cartItems = cartListContainer.locator('[data-test="inventory-item"]'); // Busca items dentro del contenedor
    await expect(cartItems).toHaveCount(2);
    //Checkout view
    await page.locator('[data-test="checkout"]').click();
    // await expect(page.locator('[data-test="fistName"]')).toBeVisible();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await page.locator('[data-test="firstName"]').fill("Edward");
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await page.locator('[data-test="lastName"]').fill("´Pineda");
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    await page.locator('[data-test="postalCode"]').fill("630004");
    await page.locator('[data-test="continue"]').click();
    //Final checkout view
    const cartListCheckoutView = page.locator('[data-test="cart-list"]');
    const cartItemsCheckoutView  = cartListCheckoutView.locator('[data-test="inventory-item"]'); // Busca items dentro del contenedor
    await expect(cartItemsCheckoutView).toHaveCount(2);
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator("div.app_logo")).toBeVisible();
  });
});
