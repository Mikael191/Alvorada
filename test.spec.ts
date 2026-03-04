import { test, expect } from '@playwright/test';

test('login and view dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Fill the login form
    await page.fill('input[type="text"]', 'Admin'); // Name
    await page.fill('input[placeholder="Ex: 3º Ano A"]', 'Diretoria'); // Room
    await page.fill('input[type="password"]', 'gremio_admin_123'); // Password

    await page.click('button[type="submit"]');

    // Wait for navigation to /admin
    await page.waitForURL('**/admin');

    // Wait for the Dashboard to load and stabilize
    await page.waitForSelector('text=Painel de Controle');
    await page.waitForTimeout(2000); // Wait for the suggestions to be fetched

    await page.screenshot({ path: 'admin_dashboard_screenshot.webp', fullPage: true });

    console.log("Screenshot saved at admin_dashboard_screenshot.webp");
});
