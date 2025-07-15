//This test file is for testing the login functionality of the Swag Labs application.
// It uses Playwright for browser automation and imports the LoginPage class to interact
import { test } from "@playwright/test";
import { LoginPage } from "@pages/swag-labs/LoginPage";

const baseUrl = process.env.BASE_URL;
const username = process.env.SWAG_LABS_VALID_USERNAME;
const password = process.env.SWAG_LABS_VALID_PASSWORD;

test("Shopping Cart Testing should login into the page with a valid user and password then should show the main page", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(baseUrl);
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  await loginPage.submit();
  await loginPage.expectAppLogoVisible();
});
