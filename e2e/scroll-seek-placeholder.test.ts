import { test, expect } from '@playwright/test'
import { navigateToExample } from './utils'

test.describe('list with scroll seek placeholders', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await navigateToExample(page, baseURL, 'scroll-seek-placeholder')
    await page.waitForTimeout(100)
  })

  test('renders placeholders when scrolled', async ({ page }) => {
    await page.evaluate(() => {
      const scroller = document.querySelector('[data-test-id=virtuoso-scroller]')!
      setInterval(() => {
        scroller.scrollBy({ top: 30 })
      }, 10)
    })

    await page.waitForSelector('#test-root div[aria-label=placeholder]')

    const color = await page.evaluate(() => {
      const placeholderItem = document.querySelector('[data-test-id=virtuoso-item-list] > div') as HTMLElement
      return placeholderItem.style.color
    })

    expect(color).toBe('red')
  })
})
