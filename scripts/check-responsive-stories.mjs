import { chromium } from 'playwright-core';
import { preview } from 'vite';
import { readCodeContract } from './check-penpot-components.mjs';

async function run() {
  let server;
  let browser;
  try {
    let base = process.env.STORYBOOK_URL;
    if (!base) {
      server = await preview({
        configFile: false,
        build: { outDir: 'storybook-static' },
        preview: { host: '127.0.0.1', port: 0 },
        logLevel: 'error',
      });
      base = server.resolvedUrls.local[0];
    }
    const response = await fetch(new URL('index.json', base));
    if (!response.ok) throw new Error('Cannot read Storybook index: ' + response.status);
    const entries = Object.values((await response.json()).entries).filter(
      (entry) => entry.type === 'story',
    );
    const stories = entries.filter((entry) => entry.tags.includes('pop-ui-contract'));
    for (const entry of entries.filter((entry) =>
      ['FieldFeedback', 'ContentAtDifferentWidths'].includes(entry.exportName),
    )) {
      if (!stories.includes(entry)) throw new Error('Missing pop-ui-contract tag: ' + entry.id);
    }
    for (const [name, { states }] of readCodeContract()) {
      if (
        states.length &&
        !stories.some(
          (entry) => entry.title === 'Core/' + name && entry.tags.includes('pop-ui-field'),
        )
      )
        throw new Error('Missing field feedback story: ' + name);
    }
    if (!stories.some((entry) => entry.exportName === 'ContentAtDifferentWidths'))
      throw new Error('No width comparisons found');
    browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
    for (const width of [375, 1280]) {
      const page = await browser.newPage({
        viewport: { width, height: 860 },
        hasTouch: width === 375,
      });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const { id, tags } of stories) {
        errors.length = 0;
        const url = new URL('iframe.html', base);
        url.search = new URLSearchParams({ id, viewMode: 'story' });
        await page.goto(url.href, { waitUntil: 'domcontentloaded' });
        try {
          const result = await page.waitForFunction(
            (id) => {
              const event = window.__STORYBOOK_ADDONS_CHANNEL__?.last('storyFinished')?.[0];
              return event?.storyId === id && event;
            },
            id,
            { timeout: 30000 },
          );
          if ((await result.jsonValue()).status !== 'success' || errors.length)
            throw new Error('Story failed');
          if (width === 375 && tags.includes('pop-ui-help')) {
            await page.getByRole('button', { name: '예약 정보 도움말' }).first().tap();
            await page.getByRole('tooltip').waitFor({ state: 'visible', timeout: 3000 });
          }
        } catch (error) {
          const details = await page
            .locator('body')
            .innerText({ timeout: 2000 })
            .catch(() => '');
          throw new Error(
            [id + ' @ ' + width + 'px', error.message, ...errors, details.slice(0, 900)].join('\n'),
          );
        }
        console.log('PASS ' + id + ' @ ' + width + 'px');
      }
      await page.close();
    }
  } finally {
    await browser?.close();
    await server?.close();
  }
}
run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
