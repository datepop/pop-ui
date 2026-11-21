import assert from 'node:assert/strict';
import test from 'node:test';
import { compareCatalog, compareSnapshots, extractCatalog } from './check-penpot-components.mjs';

const fileId = '746ae1de-283e-8110-8008-f91083966ac9';
const group = {
  name: 'SearchBar',
  path: 'Forms',
  axes: ['size', 'state'],
  variants: [
    ['sm', 'default'],
    ['sm', 'error'],
    ['md', 'default'],
    ['md', 'error'],
  ],
};
const catalog = (components) => ({ fileId, components });
const contract = new Map([
  ['SearchBar', { axes: { size: ['sm', 'md'] }, states: ['default', 'error'] }],
]);
test('requires every field state at each supported size', () => {
  assert.deepEqual(compareCatalog(contract, catalog([group])), []);
  assert.deepEqual(
    compareCatalog(contract, catalog([{ ...group, variants: group.variants.slice(1) }])),
    ['Missing: SearchBar size=sm state=default'],
  );
});
test('reports unexpected public names and duplicate component and variant definitions', () => {
  const duplicate = { ...group, variants: [...group.variants, group.variants[0]] };
  const issues = compareCatalog(
    contract,
    catalog([group, duplicate, { ...group, name: 'HotelSearchBar' }]),
  ).join('\n');
  assert.match(issues, /Duplicate family: SearchBar/);
  assert.match(issues, /duplicate variant: SearchBar/);
  assert.match(issues, /Unexpected Penpot name: HotelSearchBar/);
});
test('detects replaced combinations and regrouping while ignoring axis order and unrelated file revisions', () => {
  const baseline = catalog([group]);
  const permuted = catalog([
    {
      ...group,
      axes: ['state', 'size'],
      variants: group.variants.map(([size, state]) => [state, size]),
    },
  ]);
  assert.deepEqual(compareSnapshots(baseline, { ...permuted, revision: 2 }), []);
  assert.equal(
    compareSnapshots(baseline, catalog([{ ...group, variants: group.variants.slice(1) }])).length,
    1,
  );
  assert.ok(compareSnapshots(baseline, catalog([{ ...group, path: 'Hotel' }])).length);
});

test('rejects duplicated visible input error layers in a live Penpot main instance', () => {
  const file = {
    id: fileId,
    revn: 1,
    data: {
      components: {
        c: { id: 'c', name: 'SearchBar', mainInstancePage: 'page', mainInstanceId: 'master' },
      },
      pagesIndex: {
        page: {
          id: 'page',
          name: 'Components',
          objects: {
            master: { mainInstance: true, componentId: 'c', shapes: ['a', 'b'] },
            a: { name: 'InputWrapper-error' },
            b: { name: 'InputWrapper-error' },
          },
        },
      },
    },
  };
  assert.throws(() => extractCatalog(file), /Duplicate input error layer: SearchBar/);
  file.data.pagesIndex.page.objects.b.hidden = true;
  assert.equal(extractCatalog(file).components.length, 1);
  // A migrated or duplicated library keeps the same contract under another file id.
  file.id = 'copy';
  const copy = extractCatalog(file);
  assert.equal(copy.fileId, 'copy');
  assert.deepEqual(compareCatalog(new Map(), copy), compareCatalog(new Map(), { ...copy, fileId }));
});
