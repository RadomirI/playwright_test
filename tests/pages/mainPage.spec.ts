import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Playwright Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'Playwright API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright'
    }
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
    attribute: {
      type: 'href',
      value: '/community/welcome'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub link',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord'
    }
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Light/Dark Mode Toggle'
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search Input'
  },
  {
    locator: (page: Page): Locator => page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Title',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.'
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get Started Button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro'
    }
  }
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
//    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.openMainPage
    await mainPage.chekElementsVisability

  });

  test('Проверка текста элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка текста элемента ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Проверка переключения между светлым и тёмным режимом', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Switch between dark and light' });
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('title', 'light mode');
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('title', 'dark mode');
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute('title', 'system mode');
  });

  ['light mode', 'dark mode', 'system mode'].forEach((value) => {
  test(`Проверка стилей активного ${value}`, async ({ page }) => {
    await page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('title', value);
    }, value);
    await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
  });
  })
});























