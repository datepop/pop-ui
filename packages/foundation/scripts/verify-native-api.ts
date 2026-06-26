import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const LINE_WEIGHT_ICONS = [
  'IconArrowDown',
  'IconArrowLeft',
  'IconArrowRight',
  'IconArrowUp',
  'IconCheck',
  'IconChevronDown',
  'IconChevronLeft',
  'IconChevronRight',
  'IconChevronUp',
  'IconMinus',
  'IconPlus',
  'IconX',
];

const NATIVE_ONLY_EXPORTS = {
  icons: ['IconClockPlus'],
  illustrations: [
    'IllustrationPeopleGray',
    'IllustrationPopcornFull',
    'IllustrationPopcornPayback',
    'IllustrationWrite',
  ],
};

function readProjectFile(relativePath: string): string {
  try {
    return readFileSync(join(ROOT, relativePath), 'utf-8');
  } catch {
    throw new Error(
      `Missing generated native file: ${relativePath}. Run yarn generate:native first.`,
    );
  }
}

function assertIncludes(content: string, expected: string, label: string): void {
  if (!content.includes(expected)) {
    throw new Error(`${label} does not include expected content: ${expected}`);
  }
}

for (const iconName of LINE_WEIGHT_ICONS) {
  const content = readProjectFile(`src/icons/native/${iconName}.tsx`);
  assertIncludes(content, 'IIconLineWeightProps', `${iconName} native component`);
  assertIncludes(content, 'thick = false', `${iconName} native component`);
  assertIncludes(content, 'const strokeWidth = thick ? 2.5 : 1.5;', `${iconName} native component`);
  assertIncludes(content, 'strokeWidth={strokeWidth}', `${iconName} native component`);
}

const nativeIconIndex = readProjectFile('src/icons/native/index.ts');
for (const iconName of NATIVE_ONLY_EXPORTS.icons) {
  readProjectFile(`src/icons/native/${iconName}.tsx`);
  assertIncludes(
    nativeIconIndex,
    `export { default as ${iconName} } from './${iconName}';`,
    'native icon index',
  );
}

const nativeIllustrationIndex = readProjectFile('src/illustrations/native/index.ts');
for (const illustrationName of NATIVE_ONLY_EXPORTS.illustrations) {
  readProjectFile(`src/illustrations/native/${illustrationName}.tsx`);
  assertIncludes(
    nativeIllustrationIndex,
    `export { default as ${illustrationName} } from './${illustrationName}';`,
    'native illustration index',
  );
}

const nativeEntry = readProjectFile('src/index.native.ts');
assertIncludes(nativeEntry, 'IIconLineWeightProps', 'native entry');

console.log('Native API verification passed.');
