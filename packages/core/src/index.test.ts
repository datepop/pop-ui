import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const srcDir = dirname(fileURLToPath(import.meta.url));

const collectTypeExportNames = (relativePath: string): string[] => {
  const fileName = join(srcDir, relativePath);
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName, 'utf-8'),
    ts.ScriptTarget.Latest,
  );

  return sourceFile.statements
    .filter(ts.isExportDeclaration)
    .filter((statement) => statement.exportClause && ts.isNamedExports(statement.exportClause))
    .flatMap((statement) =>
      (statement.exportClause as ts.NamedExports).elements
        .filter((element) => statement.isTypeOnly || element.isTypeOnly)
        .map((element) => element.name.text),
    );
};

describe('core package root exports', () => {
  it('re-exports every public component type from the components barrel', () => {
    const componentTypes = collectTypeExportNames('components/index.ts');
    const rootTypes = collectTypeExportNames('index.ts');

    expect(componentTypes).toEqual(
      expect.arrayContaining(['IButtonProps', 'TButtonVariant', 'IModalProps']),
    );
    expect(componentTypes.filter((name) => !rootTypes.includes(name))).toEqual([]);
  });
});
