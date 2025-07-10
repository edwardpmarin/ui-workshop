import { test } from "@playwright/test";
import { LoginPage } from "@pages/swag-labs/LoginPage";
import pageConfig from "../../config/dev";

test("Shopping Cart Testing should login into the page with a valid user and password then should show the main page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(pageConfig.url);
  await loginPage.fillUsername(pageConfig.valid_user);
  await loginPage.fillPassword(pageConfig.valid_password);
  await loginPage.submit();
  await loginPage.expectAppLogoVisible();
});
