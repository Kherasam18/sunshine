/** Accessibility and performance rules that the screenshot pass cannot see. */
import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const BASE = process.env.QA_BASE ?? 'http://localhost:3200';
const CHROME = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean).find((p) => existsSync(p));

const ROUTES = ['/', '/collections/mithai-candles', '/products/modak-candle', '/bulk', '/customise', '/how-to-order', '/contact', '/story'];
const results = [];
const check = (name, pass, detail = '') => results.push([name, pass, detail]);

const browser = await chromium.launch({ executablePath: CHROME });

// --- viewport meta: pinch-zoom must stay available -------------------------
{
  const page = await (await browser.newContext()).newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const meta = await page.getAttribute('meta[name="viewport"]', 'content');
  check('viewport allows pinch-zoom', !/maximum-scale|user-scalable\s*=\s*no/.test(meta ?? ''), meta ?? '');
  check('viewport-fit=cover set', /viewport-fit=cover/.test(meta ?? ''), meta ?? '');
  await page.context().close();
}

// --- images: only the hero is priority, everything else lazy ---------------
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  for (const route of ROUTES) {
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const imgs = await page.evaluate(() =>
      [...document.querySelectorAll('img')].map((img) => ({
        loading: img.loading,
        fetchPriority: img.getAttribute('fetchpriority'),
        sizes: img.sizes,
        hasAlt: img.hasAttribute('alt'),
      })),
    );
    const eager = imgs.filter((i) => i.loading !== 'lazy');
    check(`${route}: at most one eager image`, eager.length <= 1, `${eager.length} eager of ${imgs.length}`);
    check(`${route}: every img has alt`, imgs.every((i) => i.hasAlt), '');
    await page.close();
  }
  await context.close();
}

// --- reduced motion: no long-running animation, no scroll-linked transform --
{
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const animated = await page.evaluate(() => {
    const running = [];
    for (const el of document.querySelectorAll('*')) {
      const style = getComputedStyle(el);
      const duration = parseFloat(style.animationDuration || '0');
      if (style.animationName !== 'none' && duration > 0.05) {
        running.push(`${el.tagName.toLowerCase()}:${style.animationName}:${style.animationDuration}`);
      }
    }
    return running.slice(0, 6);
  });
  check('reduced motion stops looping animations', animated.length === 0, animated.join(', '));

  // Content must be visible, not stuck at opacity 0 behind a reveal.
  const hidden = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section')];
    return sections.filter((s) => getComputedStyle(s).opacity === '0').length;
  });
  check('reduced motion leaves content visible', hidden === 0, `${hidden} zero-opacity sections`);
  await context.close();
}

// --- the sun token must never carry small body text on cream ---------------
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const offenders = [];
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const found = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll('p, span, a, li, dd, dt, label, small')) {
        if (!el.textContent?.trim()) continue;
        const style = getComputedStyle(el);
        const size = parseFloat(style.fontSize);
        if (size >= 24) continue;
        // #F4922B in rgb
        if (style.color.replace(/\s/g, '') === 'rgb(244,146,43)') {
          bad.push(`${el.tagName.toLowerCase()} ${Math.round(size)}px "${el.textContent.trim().slice(0, 24)}"`);
        }
      }
      return bad;
    });
    offenders.push(...found.map((f) => `${route}: ${f}`));
  }
  check('no --sun coloured small text', offenders.length === 0, offenders.slice(0, 4).join(' | '));
  await context.close();
}

// --- form controls must never render below 16px (iOS zooms on focus) -------
{
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const tooSmall = [];
  for (const route of ['/bulk', '/contact', '/customise', '/collections/mithai-candles', '/products/modak-candle', '/']) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const found = await page.evaluate(() =>
      [...document.querySelectorAll('input, select, textarea')]
        .filter((el) => {
          const s = getComputedStyle(el);
          if (s.display === 'none' || el.type === 'hidden' || el.classList.contains('sr-only')) return false;
          return parseFloat(s.fontSize) < 16;
        })
        .map((el) => `${el.tagName.toLowerCase()}#${el.id || '?'} ${getComputedStyle(el).fontSize}`),
    );
    tooSmall.push(...found.map((f) => `${route}: ${f}`));
  }
  check('form controls are >=16px (no iOS zoom)', tooSmall.length === 0, tooSmall.slice(0, 5).join(' | '));
  await context.close();
}

await browser.close();

let failed = 0;
for (const [name, pass, detail] of results) {
  if (!pass) failed += 1;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${!pass && detail ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed.`);
process.exit(failed ? 1 : 0);
