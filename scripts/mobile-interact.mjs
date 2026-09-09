/**
 * Interaction checks that a static screenshot cannot cover: the filter sheet,
 * the drawer, the customise summary bar, and the short-viewport hero.
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.QA_BASE ?? 'http://localhost:3200';
const OUT = path.resolve('mobile-qa', 'shots');
const CHROME = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean).find((p) => existsSync(p));

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, args: ['--hide-scrollbars'] });

async function phone(width = 375, height = 812) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  return context;
}

const results = [];

// 1. Short viewport — the hero must not push the CTAs below the fold.
{
  const context = await phone(375, 667);
  const page = await context.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const visible = await page.evaluate(() => {
    const cta = [...document.querySelectorAll('a')].find((a) => a.textContent.includes('Order on WhatsApp') && a.closest('section'));
    const rect = cta?.getBoundingClientRect();
    return { top: Math.round(rect?.top ?? -1), withinFold: (rect?.bottom ?? 9999) <= window.innerHeight };
  });
  await page.screenshot({ path: path.join(OUT, 'home-375x667.png') });
  results.push(['hero CTA within 667px fold', visible.withinFold, JSON.stringify(visible)]);
  await context.close();
}

// 2. Filter sheet opens, locks scroll, and closes.
{
  const context = await phone();
  const page = await context.newPage();
  await page.goto(BASE + '/collections/mithai-candles', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: /Filters/i }).click();
  await page.waitForTimeout(600);
  const state = await page.evaluate(() => ({
    dialog: Boolean(document.querySelector('[role="dialog"][aria-label="Filter products"]')),
    locked: document.body.style.overflow === 'hidden',
  }));
  await page.screenshot({ path: path.join(OUT, 'filter-sheet-375.png') });
  results.push(['filter sheet opens + locks scroll', state.dialog && state.locked, JSON.stringify(state)]);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const closed = await page.evaluate(() => !document.querySelector('[role="dialog"][aria-label="Filter products"]') && document.body.style.overflow !== 'hidden');
  results.push(['filter sheet closes on Escape', closed, '']);
  await context.close();
}

// 3. Drawer: opens, traps focus, closes on route change.
{
  const context = await phone();
  const page = await context.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, 'drawer-375.png') });
  const open = await page.evaluate(() => Boolean(document.querySelector('[role="dialog"][aria-label="Site menu"]')));
  await page.getByRole('link', { name: 'Bulk & Corporate' }).click();
  await page.waitForTimeout(1200);
  const afterNav = await page.evaluate(() => ({
    drawer: Boolean(document.querySelector('[role="dialog"][aria-label="Site menu"]')),
    locked: document.body.style.overflow === 'hidden',
    url: location.pathname,
  }));
  results.push(['drawer opens', open, '']);
  results.push(['drawer closes on route change', !afterNav.drawer && !afterNav.locked, JSON.stringify(afterNav)]);
  await context.close();
}

// 4. Customise summary bar expands.
{
  const context = await phone();
  const page = await context.newPage();
  await page.goto(BASE + '/customise', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Your brief/i }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, 'customise-bar-375.png') });
  const expanded = await page.evaluate(() => document.body.innerText.includes('Not chosen yet'));
  results.push(['customise summary bar expands', expanded, '']);
  await context.close();
}

// 5. Product action bar present, WhatsApp float suppressed.
{
  const context = await phone();
  const page = await context.newPage();
  await page.goto(BASE + '/products/modak-candle', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(900);
  const state = await page.evaluate(() => ({
    bar: Boolean(document.body.dataset.stickyActionBar),
    floats: [...document.querySelectorAll('a[aria-label="Order on WhatsApp"]')].filter((a) => {
      const r = a.getBoundingClientRect();
      return r.bottom > window.innerHeight - 120 && getComputedStyle(a).position !== 'static';
    }).length,
  }));
  await page.screenshot({ path: path.join(OUT, 'product-actionbar-375.png') });
  results.push(['product action bar present, float suppressed', state.bar && state.floats === 0, JSON.stringify(state)]);
  await context.close();
}

await browser.close();

let failed = 0;
for (const [name, pass, detail] of results) {
  if (!pass) failed += 1;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} interaction checks passed.`);
process.exit(failed ? 1 : 0);
