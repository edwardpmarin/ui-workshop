//This fixture file sets up a custom test fixture for Playwright tests.
// It extends the base test with a custom fixture that initializes the LoginPage class.
// The fixture is used to perform login actions before running tests, ensuring that the user is logged in
// before any test that requires authentication is executed.
import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "@pages/swag-labs/LoginPage";

const baseUrl = process.env.BASE_URL;
const username = process.env.SWAG_LABS_VALID_USERNAME;
const password = process.env.SWAG_LABS_VALID_PASSWORD;

type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);

    await use(loginPage); // Provide the loginPage fixture to tests
  },
});

export { expect };
