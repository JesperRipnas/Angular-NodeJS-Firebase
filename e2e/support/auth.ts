import { expect, Page } from '@playwright/test';

export interface Credentials {
  username: string;
  password: string;
}

export const users = {
  admin: { username: 'admin', password: '1234' },
  user: { username: 'user', password: '1234' },
  seller: { username: 'seller', password: '1234' },
} satisfies Record<string, Credentials>;

export const grantCookieConsent = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    localStorage.setItem('cookie_consent', 'true');
  });
};

export const login = async (
  page: Page,
  credentials: Credentials
): Promise<void> => {
  await page.goto('/');
  await page.locator('button.login-button').click();
  await page.locator('#email').fill(credentials.username);
  await page.locator('#password').fill(credentials.password);
  await page.locator('button.submit-btn').click();
  await expect(page).toHaveURL(/\/dashboard$/);
};
