import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

const pagesToTest = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Cakes', path: '/cakes' },
  { name: 'Reservation', path: '/reservation' },
  { name: 'Cart', path: '/cart' },
];

test.describe('Responsive Design Tests', () => {

  test.describe('Mobile Viewport (iPhone 13 - 390x844)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    for (const pageInfo of pagesToTest) {
      test(`${pageInfo.name} page should load without horizontal scrolling on Mobile`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pageInfo.path}`);
        
        // Give loader time to disappear
        await page.waitForTimeout(3000);

        // Check if there's any horizontal overflow
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        
        expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
      });
    }

    test('Mobile Menu toggle should work properly', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForTimeout(3000); // Wait for loader
      
      // On mobile, the desktop links should be hidden
      const desktopLink = page.locator('nav').filter({ hasText: 'MENU' }).first();
      await expect(desktopLink).not.toBeVisible();

      // Find the mobile toggle (usually a hamburger menu icon)
      // Since lucide-react MenuIcon is an svg, we look for a button containing svg in navbar
      const menuButton = page.locator('header').locator('button').first();
      
      await menuButton.click();
      
      // The mobile menu should appear with links
      const mobileMenuLink = page.getByRole('link', { name: 'HOME' });
      await expect(mobileMenuLink).toBeVisible();
    });
  });

  test.describe('Laptop Viewport (1440x900)', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    for (const pageInfo of pagesToTest) {
      test(`${pageInfo.name} page should load without horizontal scrolling on Laptop`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pageInfo.path}`);
        
        // Give loader time to disappear
        await page.waitForTimeout(3000);

        // Check if there's any horizontal overflow
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        
        expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
      });
    }
  });

});
