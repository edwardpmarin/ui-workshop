//This test file is for testing the login functionality of the Swag Labs application.
// It uses a fixture to perform login actions before running tests, ensuring that the user is logged in
// before any test that requires authentication is executed.
import { test, expect } from '../fixtures/fixtures';

test('debe mostrar el logo después del login', async ({ loginPage }) => {
  await loginPage.expectAppLogoVisible();
});