import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, it } from 'vitest';

import { copyFontAssets } from '../../../scripts/fontAssets';

it('keeps Pretendard and each additional font URL connected to its own copied bytes', () => {
  const root = mkdtempSync(join(tmpdir(), 'pop-font-assets-'));
  const source = join(root, 'source');
  const output = join(root, 'dist');
  mkdirSync(source);
  mkdirSync(output);
  const fonts = {
    'PretendardVariable.woff2': 'pretendard',
    'NotoSansKR-Medium.woff2': 'noto',
    'Montserrat-Medium.woff2': 'montserrat',
  };
  const css = Object.entries(fonts)
    .map(([name, bytes]) => {
      writeFileSync(join(source, name), bytes);
      return `@font-face{src:url(data:font/woff2;base64,${Buffer.from(bytes).toString('base64')})}`;
    })
    .join('\n');
  writeFileSync(join(source, 'OFL-NotoSansKR.txt'), 'license');
  writeFileSync(join(output, 'core.css'), css);
  copyFontAssets(source, output);
  for (const [name, bytes] of Object.entries(fonts)) {
    expect(readFileSync(join(output, 'assets', name), 'utf8')).toBe(bytes);
    expect(readFileSync(join(output, 'core.css'), 'utf8')).toContain(`url(./assets/${name})`);
  }
  expect(readFileSync(join(output, 'core.css'), 'utf8')).not.toContain('base64');
  expect(readFileSync(join(output, 'assets/OFL-NotoSansKR.txt'), 'utf8')).toBe('license');
});

it('rejects colliding file names rather than replacing another font', () => {
  const root = mkdtempSync(join(tmpdir(), 'pop-font-collision-'));
  mkdirSync(join(root, 'a'));
  mkdirSync(join(root, 'b'));
  writeFileSync(join(root, 'a/font.woff2'), 'first');
  writeFileSync(join(root, 'b/font.woff2'), 'second');
  expect(() => copyFontAssets(root, join(root, 'dist'))).toThrow(/Duplicate font/);
});
