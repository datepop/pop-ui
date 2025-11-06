import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import storybookPlugin from 'eslint-plugin-storybook';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import prettierConfig from 'eslint-config-prettier';

const config = [
  // ESLint가 무시할 파일/폴더
  {
    ignores: [
      'node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.storybook-static/**',
      'storybook-static/**',
      '**/*.d.ts',
      '**/vite-env.d.ts',
      '.yarn/**',
    ],
  },

  // TypeScript 권장 규칙
  ...tseslint.configs.recommended,

  // React 설정
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'eslint-comments': eslintCommentsPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: '19.2.0', // React 19
      },
    },
    rules: {
      // React 권장 규칙
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // React Hooks 규칙
      ...reactHooksPlugin.configs.recommended.rules,

      // TypeScript 커스텀 룰
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React 커스텀 룰
      'react/prop-types': 'off', // TypeScript 사용하므로 불필요
      'react/react-in-jsx-scope': 'off', // React 17+ 자동 import

      // Import 정렬 규칙
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node built-in modules (fs, path 등)
            'external', // 외부 라이브러리 (@storybook/react 등)
            ['internal', 'parent', 'sibling', 'index'], // 내부 imports (., .., ./component 등)
            'type', // Type imports (import type)
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript type import 강제
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // TypeScript naming convention: Interface는 I prefix, Type은 T prefix
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
      ],

      // ESLint 주석 규칙: @typescript-eslint/no-explicit-any에 대한 disable 금지
      'eslint-comments/no-restricted-disable': [
        'error',
        '@typescript-eslint/no-explicit-any',
      ],
      'eslint-comments/no-unlimited-disable': 'error',
    },
  },

  // Storybook 설정
  ...storybookPlugin.configs['flat/recommended'],

  // Prettier와 충돌 방지 (마지막에 적용)
  prettierConfig,
];

export default config;
