// pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(baseUrl: string) {
    await this.page.goto(baseUrl);
  }


  async fillUsername(username: string) {
    const usernameInput = this.page.locator('[data-test="username"]');
    await usernameInput.fill(username);
    await expect(usernameInput).toBeVisible();
  }

  async fillPassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async submit() {
    await this.page.click('[data-test="login-button"]');
  }

  async expectAppLogoVisible() {
    await expect(this.page.locator('div.app_logo')).toBeVisible();
  }

    async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}
