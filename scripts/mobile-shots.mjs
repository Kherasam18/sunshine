/**
 * Section-level screenshots for visual inspection.
 * Usage: node scripts/mobile-shots.mjs <route> <width> [scrollPositions...]
 * Example: node scripts/mobile-shots.mjs / 375 0 700 1400
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

const [, , route = '/', widthArg = '375', ...positions] = process.argv;
const width = Number(widthArg);
const scrolls = positions.length ? positions.map(Number) : [0];
const slug = route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';

const browser = await chromium.launch({ executablePath: CHROME, args: ['--hide-scrollbars'] });
const context = await browser.newContext({
  viewport: { width, height: 812 },
  deviceScaleFactor: 2,
  isMobile: width <= 768,
  hasTouch: width <= 768,
});
const page = await context.newPage();
await mkdir(OUT, { recursive: true });
await page.goto(BASE + route, { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(800);

for (const y of scrolls) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(500);
  const file = path.join(OUT, `${slug}-${width}-y${y}.png`);
  await page.screenshot({ path: file });
  console.log(file);
}

await browser.close();
