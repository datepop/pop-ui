import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, Plugin } from "vite";
import fs from "fs";

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

const copyFontPlugin = (fontPath?: string): Plugin => {
  let outDir = 'dist';

  return {
    name: 'copy-font-files',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const defaultFontPath = path.join(process.cwd(), 'src/components/shared/PretendardVariable.woff2');
      const fontSource = fontPath || defaultFontPath;
      const assetsDir = path.join(outDir, 'assets');

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const fontDest = path.join(assetsDir, 'PretendardVariable.woff2');
      if (fs.existsSync(fontSource)) {
        fs.copyFileSync(fontSource, fontDest);
        console.log('Font file copied to:', fontDest);
      }

      const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
      cssFiles.forEach(cssFile => {
        const cssPath = path.join(assetsDir, cssFile);
        let cssContent = fs.readFileSync(cssPath, 'utf-8');
        const regex = /url\(data:font\/woff2;base64,[^)]+\)/g;
        const matches = cssContent.match(regex);

        if (matches) {
          console.log(`Found ${matches.length} base64 font URLs in ${cssFile}`);
          cssContent = cssContent.replace(regex, 'url(./PretendardVariable.woff2)');
          fs.writeFileSync(cssPath, cssContent);
          console.log(`CSS font URLs replaced in ${cssFile}`);
        }
      });
    },
  };
};

export const getBaseConfig = ({ plugins = [], lib }) =>
  defineConfig({
    plugins: [react(), copyFontPlugin(), ...plugins],
    build: {
      assetsInlineLimit: 0,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        ...lib,
      },
      rollupOptions: {
        external: isExternal,
        output: {
          globals: {
            react: "React",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.woff2')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  });

const config = getBaseConfig({
  lib: {
    name: "UI",
    fileName: "ui",
  },
});

export default config;
