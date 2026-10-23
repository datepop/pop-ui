import fs from 'fs';
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import type { Plugin, Rollup } from 'vite';

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

const copyFontPlugin = (fontPath?: string): Plugin => {
  let outDir = 'dist';

  return {
    name: 'copy-font-files',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const defaultFontPath = path.join(
        process.cwd(),
        'src/components/shared/PretendardVariable.woff2',
      );
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
      const rootCssFiles = fs.readdirSync(outDir).filter((f) => f.endsWith('.css'));
      rootCssFiles.forEach((cssFile) => {
        const cssPath = path.join(outDir, cssFile);
        let cssContent = fs.readFileSync(cssPath, 'utf-8');
        const regex = /url\(data:font\/woff2;base64,[^)]+\)/g;
        const matches = cssContent.match(regex);

        if (matches) {
          console.log(`Found ${matches.length} base64 font URLs in ${cssFile}`);
          cssContent = cssContent.replace(regex, 'url(./assets/PretendardVariable.woff2)');
        }

        fs.writeFileSync(cssPath, cssContent);
        console.log(`Font URLs processed in ${cssFile}`);
      });
    },
  };
};

const sharedOutput: Rollup.OutputOptions = {
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react/jsx-runtime': 'jsxRuntime',
    '@mantine/core': 'MantineCore',
    '@mantine/hooks': 'MantineHooks',
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
};

// ESM 을 소스 모듈 단위 파일로 내보내 소비자 번들러가 쓰지 않는 컴포넌트와 그 외부 의존성을 버릴 수 있게 한다.
// 진입 파일은 기존 경로(`<fileName>.js`)를 유지하고 나머지 모듈은 `esm/` 아래에 src 구조 그대로 둔다.
// UMD 는 preserveModules 를 지원하지 않으므로 기존 단일 파일(`<fileName>.umd.cjs`)로 남긴다.
const getPreservedModulesOutputs = (lib: {
  entry: string;
  name: string;
  fileName: string;
}): Rollup.OutputOptions[] => [
  {
    ...sharedOutput,
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: path.dirname(lib.entry),
    entryFileNames: (chunk) => (chunk.isEntry ? `${lib.fileName}.js` : 'esm/[name].js'),
  },
  {
    ...sharedOutput,
    format: 'umd',
    name: lib.name,
  },
];

export const getBaseConfig = ({ plugins = [], lib, preserveModules = false }) => {
  const resolvedLib = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    ...lib,
  };

  return defineConfig({
    plugins: [
      react(),
      dts({
        rollupTypes: true,
        skipDiagnostics: true,
        outDir: 'dist/types',
        entryRoot: 'src',
      }),
      copyFontPlugin(),
      ...plugins,
    ],
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    build: {
      assetsInlineLimit: 0,
      lib: resolvedLib,
      rollupOptions: {
        external: isExternal,
        output: preserveModules ? getPreservedModulesOutputs(resolvedLib) : sharedOutput,
      },
    },
  });
};

const config = getBaseConfig({
  lib: {
    name: 'UI',
    fileName: 'ui',
  },
});

export default config;
