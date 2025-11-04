import fs from "fs";
import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import type { Plugin } from "vite";

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

      // CSS 파일은 dist 루트에 생성되므로 거기서 찾아서 수정
      const rootCssFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.css'));
      rootCssFiles.forEach(cssFile => {
        const cssPath = path.join(outDir, cssFile);
        let cssContent = fs.readFileSync(cssPath, 'utf-8');
        const regex = /url\(data:font\/woff2;base64,[^)]+\)/g;
        const matches = cssContent.match(regex);

        if (matches) {
          console.log(`Found ${matches.length} base64 font URLs in ${cssFile}`);
          cssContent = cssContent.replace(regex, 'url(./assets/PretendardVariable.woff2)');
        }

        const mantineCssFiles = [
          '@mantine/core/styles.css',
          '@mantine/dates/styles.css',
          '@mantine/dropzone/styles.css',
        ];

        const rootNodeModules = path.join(__dirname, 'node_modules');
        mantineCssFiles.forEach(mantineFile => {
          const mantineCssPath = path.join(rootNodeModules, mantineFile);
          if (fs.existsSync(mantineCssPath)) {
            const mantineCss = fs.readFileSync(mantineCssPath, 'utf-8');
            cssContent += '\n' + mantineCss;
            console.log(`Merged ${mantineFile}`);
          } else {
            console.log(`Not found: ${mantineCssPath}`);
          }
        });

        fs.writeFileSync(cssPath, cssContent);
        console.log(`Mantine CSS merged into ${cssFile}`);
      });
    },
  };
};

export const getBaseConfig = ({ plugins = [], lib }) =>
  defineConfig({
    plugins: [
      react(),
      dts({
        rollupTypes: true,
        skipDiagnostics: true,
        outDir: 'dist/types',
        entryRoot: 'src',
      }),
      copyFontPlugin(),
      ...plugins
    ],
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
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
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
            "@mantine/core": "MantineCore",
            "@mantine/hooks": "MantineHooks",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.woff2')) {
              return 'assets/[name][extname]';
            }
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return '[name].css';
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
