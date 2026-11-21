import { writeFile } from 'node:fs/promises';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import * as brand from '../src/brand';
import * as icons from '../src/icons';
import { iconMetadata, lineWeightIconNames } from '../src/icons/metadata';
import * as illustrations from '../src/illustrations';

import type { ComponentType } from 'react';

interface IAssetProps {
  variant?: 'line' | 'filled';
  thick?: boolean;
}

function exportGroup(
  components: Record<string, ComponentType>,
  optionsFor: (name: string) => IAssetProps[],
) {
  const exportsByComponent = new Map<ComponentType, string[]>();
  for (const [name, component] of Object.entries(components)) {
    const names = exportsByComponent.get(component) ?? [];
    names.push(name);
    exportsByComponent.set(component, names);
  }

  return Array.from(exportsByComponent, ([component, names]) => {
    const name = names.find((candidate) => candidate === component.name) ?? names[0];
    return {
      name,
      aliases: names.filter((candidate) => candidate !== name).sort(),
      variants: optionsFor(name).map((props) => ({
        props,
        svg: renderToStaticMarkup(createElement<IAssetProps>(component, props)),
      })),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

const catalog = {
  icons: exportGroup(icons, (name) =>
    iconMetadata[name as keyof typeof icons].variants.flatMap((variant) =>
      variant === 'line' && lineWeightIconNames.has(name)
        ? [
            { variant, thick: false },
            { variant, thick: true },
          ]
        : [{ variant }],
    ),
  ).filter(({ name }) => !iconMetadata[name as keyof typeof icons].replacedBy),
  illustrations: exportGroup(illustrations, () => [{}]),
  brand: exportGroup(brand, () => [{}]),
};

const json = JSON.stringify(catalog, null, 2) + '\n';
if (process.argv[2]) await writeFile(process.argv[2], json);
else process.stdout.write(json);
