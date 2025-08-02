import test, { expect, Page, Locator } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
    readonly page: Page
    readonly elements: Elements[]


    constructor(page: Page) {
        this.page = page
        this.elements = [
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
    }
async openMainPage () {
    await this.page.goto('https://playwright.dev/')
}

async chekElementsVisability () {
    for(const { locator, name } of this.elements) {
          test.step(`Проверка отображения элемента ${name}`, async () => {
            await expect(locator(this.page)).toBeVisible();
          });
        };
}

async chekElementsHrefAttribute () {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
              test.step(`Проверка атрибута href элемента ${name}`, async () => {
                await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
              });
            }
    }


}

}
   

