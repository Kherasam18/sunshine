/**
 * Mobile QA harness.
 *
 * For every route × breakpoint it:
 *   1. saves a full-page screenshot to /mobile-qa/<route>-<width>.png
 *   2. reports horizontal overflow (documentElement.scrollWidth > innerWidth)
 *      and names the elements sticking out past the viewport
 *   3. reports interactive elements whose rendered box is under 44 × 44 CSS px
 *
 * Usage:  node scripts/mobile-qa.mjs [--widths 320,375] [--routes /,/bulk]
 *
 * Drives the locally installed Chrome through playwright-core, so no browser
 * download is needed.
 */
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.QA_BASE ?? 'http://localhost:3200';
const OUT = path.resolve('mobile-qa');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

const ROUTES = [
  ['/', 'home'],
  ['/collections/mithai-candles', 'collection-mithai'],
  ['/collections/marathi-craft', 'collection-marathi'],
  ['/products/modak-candle', 'product-modak'],
  ['/products/marathi-quote-nameplate', 'product-marathi'],
  ['/occasions/ganesh-chaturthi', 'occasion-ganesh'],
  ['/bulk', 'bulk'],
  ['/customise', 'customise'],
  ['/story', 'story'],
  ['/how-to-order', 'how-to-order'],
  ['/contact', 'contact'],
  ['/not-a-real-page', 'not-found'],
];

const argWidths = process.argv.indexOf('--widths');
const WIDTHS =
  argWidths > -1
    ? process.argv[argWidths + 1].split(',').map(Number)
    : [320, 360, 375, 768, 1280];

const argRoutes = process.argv.indexOf('--routes');
const ACTIVE_ROUTES =
  argRoutes > -1
    ? ROUTES.filter(([route]) => process.argv[argRoutes + 1].split(',').includes(route))
    : ROUTES;

/** Runs in the page: measures overflow and undersized tap targets. */
const AUDIT = () => {
  const vw = window.innerWidth;
  const describe = (el) => {
    const cls = typeof el.className === 'string' ? el.className : el.className?.baseVal || '';
    const id = el.id ? `#${el.id}` : '';
    return `${el.tagName.toLowerCase()}${id}${cls ? '.' + cls.trim().split(/\s+/).slice(0, 3).join('.') : ''}`;
  };

  // --- horizontal overflow -------------------------------------------------
  const docWidth = document.documentElement.scrollWidth;
  const overflowing = [];
  if (docWidth > vw + 1) {
    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el);
      if (style.position === 'fixed' || style.visibility === 'hidden' || style.display === 'none') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;
      if (rect.right <= vw + 1 && rect.left >= -1) continue;
      // Ignore anything already clipped by an ancestor.
      let clipped = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ps = getComputedStyle(p);
        if (ps.overflowX === 'hidden' || ps.overflowX === 'auto' || ps.overflowX === 'scroll') {
          clipped = true;
          break;
        }
      }
      if (clipped) continue;
      overflowing.push({
        el: describe(el),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });
    }
  }

  // --- touch targets -------------------------------------------------------
  const SELECTOR = 'a[href], button, input, select, textarea, [role="radio"], [role="button"], [tabindex]:not([tabindex="-1"])';
  const small = [];
  for (const el of document.querySelectorAll(SELECTOR)) {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
    // Headings that only *look* like buttons on desktop are not tap targets.
    if (style.pointerEvents === 'none') continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    // Skip visually-hidden helpers (skip link, sr-only inputs)
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (el.classList.contains('sr-only')) continue;
    // An input wrapped in a large label is tapped via the label.
    const wrappingLabel = el.closest('label');
    if (wrappingLabel && wrappingLabel !== el) {
      const lr = wrappingLabel.getBoundingClientRect();
      if (lr.width >= 44 && lr.height >= 44) continue;
    }
    // A link inside a text paragraph is exempt from the 44px rule.
    const inProse = el.tagName === 'A' && el.parentElement && /^(P|LI|SPAN|H[1-6]|DD|DT)$/.test(el.parentElement.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 12;
    if (inProse) continue;
    if (rect.width < 44 || rect.height < 44) {
      small.push({
        el: describe(el),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
      });
    }
  }

  return { vw, docWidth, overflow: docWidth > vw + 1, overflowing: overflowing.slice(0, 15), small };
};

async function main() {
  const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!executablePath) throw new Error(`No Chrome found. Tried:\n${CHROME_CANDIDATES.join('\n')}`);

  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath, args: ['--hide-scrollbars'] });

  const report = [];
  let overflowCount = 0;
  let targetCount = 0;

  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: width <= 420 ? 812 : 900 },
      deviceScaleFactor: 2,
      isMobile: width <= 768,
      hasTouch: width <= 768,
      userAgent:
        width <= 420
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
          : undefined,
    });

    for (const [route, name] of ACTIVE_ROUTES) {
      const page = await context.newPage();
      try {
        await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 45000 });
        // Let scroll-reveal animations settle so screenshots aren't half-faded.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(700);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);

        await page.screenshot({ path: path.join(OUT, `${name}-${width}.png`), fullPage: true });
        const result = await page.evaluate(AUDIT);

        if (result.overflow) overflowCount += 1;
        // The 44px rule is a touch guideline: enforced up to iPad, reported
        // (but not failed) on mouse-driven desktop widths.
        if (width <= 768) targetCount += result.small.length;
        report.push({ route, width, ...result });
      } catch (error) {
        report.push({ route, width, error: String(error).slice(0, 160) });
      } finally {
        await page.close();
      }
    }
    await context.close();
  }

  await browser.close();

  // ---- console summary ----
  let output = '';
  const line = (s = '') => {
    output += s + '\n';
    console.log(s);
  };

  line('\n================ OVERFLOW ================');
  const bad = report.filter((r) => r.overflow);
  if (bad.length === 0) line('CLEAN — no horizontal overflow at any width.');
  for (const r of bad) {
    line(`\n${r.route} @ ${r.width}px  (doc ${r.docWidth} > viewport ${r.vw})`);
    for (const o of r.overflowing) line(`   ${o.el}  [${o.left} → ${o.right}, w=${o.width}]`);
  }

  // The 44px minimum is a touch guideline: enforced up to iPad, and only
  // reported at desktop widths where 36px mouse targets are conventional.
  line('\n================ TOUCH TARGETS < 44px (enforced ≤768px) ================');
  const withSmall = report.filter((r) => r.small?.length && r.width <= 768);
  if (withSmall.length === 0) line('CLEAN — every touch target is at least 44×44 up to 768px.');
  for (const r of withSmall) {
    line(`\n${r.route} @ ${r.width}px — ${r.small.length} undersized`);
    const seen = new Map();
    for (const s of r.small) {
      const key = `${s.el}|${s.w}x${s.h}`;
      seen.set(key, (seen.get(key) ?? 0) + (s.text ? 1 : 1));
    }
    for (const [key, count] of [...seen.entries()].slice(0, 12)) {
      line(`   ${key.split('|')[0]}  ${key.split('|')[1]}${count > 1 ? `  ×${count}` : ''}`);
    }
  }

  const errors = report.filter((r) => r.error);
  if (errors.length) {
    line('\n================ ERRORS ================');
    for (const e of errors) line(`${e.route} @ ${e.width}: ${e.error}`);
  }

  line(`\nSUMMARY: ${bad.length} overflow failures, ${targetCount} undersized targets, ${errors.length} errors.`);
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  await writeFile(path.join(OUT, 'report.txt'), output);
  process.exit(bad.length === 0 && targetCount === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
