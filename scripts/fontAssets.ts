import fs from 'node:fs';
import path from 'node:path';

/** Vite library mode inlines fonts. Keep each URL attached to its original bytes. */
export function copyFontAssets(sourceDir: string, outDir: string): void {
  if (!fs.existsSync(sourceDir)) return;
  const files: string[] = [];
  const visit = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (/\.woff2$|^OFL-.*\.txt$/.test(entry.name)) files.push(file);
    }
  };
  visit(sourceDir);
  const byName = new Map<string, string>();
  const byData = new Map<string, string>();
  for (const file of files) {
    const name = path.basename(file);
    if (byName.has(name)) throw new Error(`Duplicate font asset name: ${name}`);
    byName.set(name, file);
    if (name.endsWith('.woff2')) byData.set(fs.readFileSync(file).toString('base64'), name);
  }
  if (!files.length) return;
  const assetsDir = path.join(outDir, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });
  for (const [name, file] of byName) fs.copyFileSync(file, path.join(assetsDir, name));
  for (const entry of fs.readdirSync(outDir)) {
    if (!entry.endsWith('.css')) continue;
    const cssPath = path.join(outDir, entry);
    const css = fs
      .readFileSync(cssPath, 'utf8')
      .replace(/url\(["']?data:font\/woff2;base64,([^"')]+)["']?\)/g, (_url, bytes: string) => {
        const name = byData.get(bytes);
        if (!name) throw new Error('An inline font has no matching source asset');
        return `url(./assets/${name})`;
      });
    fs.writeFileSync(cssPath, css);
  }
}
