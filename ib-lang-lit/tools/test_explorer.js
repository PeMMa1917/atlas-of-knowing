#!/usr/bin/env node
/* End-to-end test of the IB Activity Explorer against simulated gviz payloads. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCRATCH = __dirname;
const HTML = path.join(__dirname, '..', 'index.html');

let failures = 0;
function check(name, cond, extra) {
  if (cond) console.log('  ✓ ' + name);
  else { failures++; console.log('  ✗ FAIL: ' + name + (extra ? ' — ' + extra : '')); }
}

async function loadPage(browser, payloadFile, consoleErrors) {
  const page = await browser.newPage();
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push(String(e)));
  await page.route('**/gviz/tq*', async route => {
    const url = new URL(route.request().url());
    const tqx = url.searchParams.get('tqx') || '';
    const cb = (tqx.match(/responseHandler:([^;]+)/) || [])[1] || 'callback';
    const body = cb + '(' + fs.readFileSync(path.join(SCRATCH, payloadFile), 'utf8') + ');';
    await route.fulfill({ contentType: 'application/javascript', body });
  });
  // block webfonts (offline sandbox)
  await page.route('**/fonts.googleapis.com/**', r => r.fulfill({ contentType: 'text/css', body: '' }));
  await page.route('**/fonts.gstatic.com/**', r => r.abort());
  await page.goto('file://' + HTML);
  await page.waitForFunction(() => document.getElementById('status-text').textContent.includes('activities loaded'), null, { timeout: 15000 });
  return page;
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  // ───────────────────────── NEW SHEET ─────────────────────────
  console.log('\n── v3 sheet (24 columns) ──');
  let errs = [];
  let page = await loadPage(browser, 'gviz_new.json', errs);

  const total = await page.evaluate(() => allActivities.length);
  check('loads all 3,325 activities', total === 3325, 'got ' + total);

  const selCount = await page.locator('#filter-sections select').count();
  check('19 filter dropdowns built', selCount === 19, 'got ' + selCount);

  const presets = await page.locator('.preset-btn').count();
  check('8 quick-start presets shown', presets === 8, 'got ' + presets);

  const cards = await page.locator('.card').count();
  check('default view renders 5 cards', cards === 5, 'got ' + cards);

  const hasWhy = await page.locator('.card-why').count();
  check('cards show "why it helps" strip', hasWhy > 0);
  const hasHelp = await page.locator('.card-help').count();
  check('cards show success/stuck details block', hasHelp > 0);

  // Assessment filter
  await page.selectOption('#f-assessment', 'Individual Oral');
  let n = await page.evaluate(() => filtered.length);
  check('Assessment=Individual Oral filters (871 expected)', n === 871, 'got ' + n);

  // Cross-assessment scope
  await page.selectOption('#f-scope', 'Links 2+ assessments');
  n = await page.evaluate(() => filtered.length);
  check('IO ∩ cross-assessment > 0', n > 200, 'got ' + n);
  const ioCross = n;

  // Work focus + smart graying
  await page.selectOption('#f-work', 'Barbara Kruger');
  n = await page.evaluate(() => filtered.length);
  check('…∩ Kruger > 0', n > 0 && n < ioCross, 'got ' + n);
  const disabledSomewhere = await page.evaluate(() =>
    [...document.querySelectorAll('#filter-sections option')].some(o => o.disabled));
  check('smart graying disables impossible options', disabledSomewhere);

  const chips = await page.locator('.chip').count();
  check('active-filter chips shown (3)', chips === 3, 'got ' + chips);

  // chip removal
  await page.locator('.chip').nth(2).click();
  n = await page.evaluate(() => filtered.length);
  check('clicking a chip clears that filter', n === ioCross, 'got ' + n);

  await page.click('text=Clear all');
  n = await page.evaluate(() => filtered.length);
  check('Clear all restores full set', n === 3325, 'got ' + n);

  // Style Preference has all 15 canonical options
  const styleOpts = await page.evaluate(() =>
    [...document.querySelectorAll('#f-style option')].map(o => o.value).filter(Boolean));
  check('Style Preference lists 15 canonical styles', styleOpts.length === 15, 'got ' + styleOpts.length);

  // Search
  await page.fill('#f-search', 'tarantella');
  await page.waitForTimeout(350);
  n = await page.evaluate(() => filtered.length);
  check('search "tarantella" finds rows', n > 0 && n < 60, 'got ' + n);

  // Preset: exam tomorrow
  await page.click('text=Exam is tomorrow');
  n = await page.evaluate(() => filtered.length);
  const proxVal = await page.evaluate(() => document.getElementById('f-prox').value);
  check('preset sets Night Before proximity', proxVal === 'Night Before');
  check('night-before pool is generous (Any Time included)', n > 2000, 'got ' + n);

  // Helps filter
  await page.click('text=Clear all');
  await page.selectOption('#f-helps', 'Getting Started');
  n = await page.evaluate(() => filtered.length);
  check('Helps With = Getting Started > 100', n > 100, 'got ' + n);

  // Energy filter
  await page.click('text=Clear all');
  await page.selectOption('#f-energy', 'Low — fine when tired');
  n = await page.evaluate(() => filtered.length);
  check('Energy=Low > 500', n > 500, 'got ' + n);

  // Show All cap
  await page.click('text=Clear all');
  await page.click('.mode-btn[data-mode="all"]');
  const shown = await page.locator('.card').count();
  check('Show All caps at 100 cards', shown === 100, 'got ' + shown);
  const note = await page.locator('.showing-note').count();
  check('cap note displayed', note === 1);

  // Random 1 highlight
  await page.click('.mode-btn[data-mode="one"]');
  const hl = await page.locator('.card.highlight').count();
  check('Random 1 highlights single card', hl === 1);

  check('no console errors (v3 sheet)', errs.length === 0, errs.slice(0, 3).join(' | '));
  await page.close();

  // ───────────────────────── OLD SHEET (labels) ─────────────────────────
  console.log('\n── legacy sheet, gviz labels present ──');
  errs = [];
  page = await loadPage(browser, 'gviz_oldA.json', errs);
  let t = await page.evaluate(() => allActivities.length);
  check('loads 1,926 legacy activities', t === 1926, 'got ' + t);

  const assessOpts = await page.evaluate(() =>
    [...document.querySelectorAll('#f-assessment option')].map(o => o.value).filter(Boolean));
  check('assessment derived on legacy sheet', assessOpts.length >= 3, assessOpts.join(','));

  await page.selectOption('#f-assessment', 'Individual Oral');
  t = await page.evaluate(() => filtered.length);
  check('legacy IO assessment derivation ~68', t > 30 && t < 200, 'got ' + t);

  await page.selectOption('#f-work', 'Banksy');
  t = await page.evaluate(() => filtered.length);
  check('legacy Banksy work detection > 5', t > 5, 'got ' + t);

  const legacyStyles = await page.evaluate(() =>
    [...document.querySelectorAll('#f-style option')].map(o => o.value).filter(Boolean));
  check('legacy styles normalized to canonical set', legacyStyles.every(s =>
    ['Visual','Spatial','Auditory','Reading','Writing','Kinesthetic','Verbal','Linguistic','Logical',
     'Analytical','Social/Interpersonal','Solitary','Intrapersonal','Naturalist','Multimodal'].includes(s)),
    legacyStyles.join(','));

  // legacy sheet has no Why/Success columns → no empty blocks
  const whyBlocks = await page.locator('.card-why').count();
  const helpBlocks = await page.locator('.card-help').count();
  check('legacy cards omit guidance blocks gracefully', whyBlocks === 0 && helpBlocks === 0,
        `why=${whyBlocks} help=${helpBlocks}`);

  // commute rows land in On the Go location
  await page.click('text=Clear all');
  const locOpts = await page.evaluate(() =>
    [...document.querySelectorAll('#f-location option')].map(o => o.value).filter(Boolean));
  check('legacy context skills → On the Go/Out & About/During Screen Time locations',
        locOpts.includes('On the Go') && locOpts.includes('During Screen Time'), locOpts.join(','));

  check('no console errors (legacy A)', errs.length === 0, errs.slice(0, 3).join(' | '));
  await page.close();

  // ───────────────────── OLD SHEET (no labels, header row in data) ─────────────────────
  console.log('\n── legacy sheet, headers as first data row ──');
  errs = [];
  page = await loadPage(browser, 'gviz_oldB.json', errs);
  t = await page.evaluate(() => allActivities.length);
  check('header-row fallback: loads 1,926', t === 1926, 'got ' + t);
  check('no console errors (legacy B)', errs.length === 0, errs.slice(0, 3).join(' | '));
  await page.close();

  await browser.close();
  console.log(failures === 0 ? '\nALL TESTS PASSED' : `\n${failures} FAILURES`);
  process.exit(failures ? 1 : 0);
})();
