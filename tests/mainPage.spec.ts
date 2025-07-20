import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string
  text?: string
  atribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    atribute: {
      type: 'href',
      value: '/'
    }
  },
    {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Playwright Docs link',
    text: 'Docs',
    value: '/docs/intro'
  },
    {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'Playwright API link',
    text: 'API',
    value: '/docs/api/class-playwright'
  },
    {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'NodeJS Button',
    text: 'Node.js'
    
  },
    {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    value: '/community/welcome'
  },
    {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub link',
    value: 'https://aka.ms/playwright/discord'
  },
    {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord link',
    value: 'https://aka.ms/playwright/discord'
  },
    {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Light icon'
  },
    {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'search input'
  }

];

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
       test.step(`Проверка отображения элемента ${name}`, async () => {
      await expect.soft(locator(page)).toBeVisible();
    });

    
  }) 
 
});


test('Проверка названия элементов навигации хедера', async ({ page }) => {
  elements.forEach(({ locator, name, text }) => {
    if (text) {
      test.step(`Проверка названия элемента ${name}`, async () => {
        await expect(locator(page)).toContainText(text)
      })
    }
  }
 
  )
});


test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
  elements.forEach(({ locator, name, atribute }) => {
    if (atribute) {
      test.step(`проверка атрибутов href ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(atribute?.type, atribute?.value)
      })
    }
  }
 
  )
});


test('Проверка переключения лайт мода', async ({ page }) => {
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'light mode')
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toHaveAttribute('title', 'dark mode')
});


test('Проверка заголовка стиницы', async ({ page }) => {
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
});


test('Проверка кнопки Get Started', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');

});
})







