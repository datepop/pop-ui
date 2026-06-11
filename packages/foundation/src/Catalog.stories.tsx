import { Stack, Text, Paper, Box, TextInput, Button, Group, Select, Badge } from '@mantine/core';
import React, { useState } from 'react';

import type { IBrandIconProps } from './types/brand';
import type { IIconProps } from './types/icon';
import type { IIllustrationProps } from './types/illustration';
import type { Meta, StoryObj } from '@storybook/react-vite';

type TCatalogKind = 'icon' | 'illustration' | 'brand';

type TCatalogItem =
  | { kind: 'icon'; name: string; component: React.FC<IIconProps> }
  | { kind: 'illustration'; name: string; component: React.FC<IIllustrationProps> }
  | { kind: 'brand'; name: string; component: React.FC<IBrandIconProps> };

const iconModules = import.meta.glob<{ default: React.FC<IIconProps> }>('./icons/Icon*.tsx', {
  eager: true,
});
const illustrationModules = import.meta.glob<{ default: React.FC<IIllustrationProps> }>(
  './illustrations/Illustration*.tsx',
  { eager: true },
);
const brandModules = import.meta.glob<{ default: React.FC<IBrandIconProps> }>('./brand/Icon*.tsx', {
  eager: true,
});

const moduleName = (path: string) => path.split('/').pop()!.replace('.tsx', '');

const catalog: TCatalogItem[] = [
  ...Object.entries(iconModules).map(([path, m]) => ({
    kind: 'icon' as const,
    name: moduleName(path),
    component: m.default,
  })),
  ...Object.entries(illustrationModules).map(([path, m]) => ({
    kind: 'illustration' as const,
    name: moduleName(path),
    component: m.default,
  })),
  ...Object.entries(brandModules).map(([path, m]) => ({
    kind: 'brand' as const,
    name: moduleName(path),
    component: m.default,
  })),
]
  .filter((item) => !item.name.includes('.stories'))
  .sort((a, b) => a.name.localeCompare(b.name));

const kindLabel: Record<TCatalogKind, string> = {
  icon: 'Icon',
  illustration: 'Illustration',
  brand: 'BrandIcon',
};

const kindColor: Record<TCatalogKind, string> = {
  icon: 'blue',
  illustration: 'grape',
  brand: 'teal',
};

const typeFilterOptions = [
  { value: '', label: 'All' },
  { value: 'icon', label: 'Icons' },
  { value: 'illustration', label: 'Illustrations' },
  { value: 'brand', label: 'BrandIcons' },
];

const meta: Meta = {
  title: 'Foundation/Catalog',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

const CatalogCard: React.FC<{ item: TCatalogItem; size: number }> = ({ item, size }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const sizeProp = size !== 24 ? `size={${size}} ` : '';
    const code = `import { ${item.name} } from '@pop-ui/foundation';\n\n<${item.name} ${sizeProp}/>`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const Component = item.component as React.FC<{ size?: number }>;

  return (
    <Paper
      p="lg"
      withBorder
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={handleCopy}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Stack gap="md" align="center">
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <Component size={size} />
        </Box>
        <Stack gap={6} align="center">
          <Badge color={kindColor[item.kind]} size="xs" variant="light">
            {kindLabel[item.kind]}
          </Badge>
          <Text size="sm" fw={600} ta="center" style={{ wordBreak: 'break-all' }}>
            {item.name}
          </Text>
          <Text size="xs" c="dimmed">
            {copied ? 'Copied!' : 'Click to copy'}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const SearchAll: StoryObj<{ size: number }> = {
  args: { size: 24 },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
      description: 'Preview size in pixels',
    },
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const filtered = catalog.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || item.kind === typeFilter;
      return matchesSearch && matchesType;
    });

    const counts = {
      icon: catalog.filter((i) => i.kind === 'icon').length,
      illustration: catalog.filter((i) => i.kind === 'illustration').length,
      brand: catalog.filter((i) => i.kind === 'brand').length,
    };

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            Foundation Catalog
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Search across all {catalog.length} components: {counts.icon} icons,{' '}
            {counts.illustration} illustrations, {counts.brand} brand icons. Click any card to copy
            its import code.
          </Text>
          <Group gap="md" wrap="wrap">
            <TextInput
              placeholder="Search by name (e.g. arrow, kakao, calendar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '240px', maxWidth: '480px' }}
            />
            <Select
              placeholder="Type"
              value={typeFilter}
              onChange={(v) => setTypeFilter(v ?? '')}
              data={typeFilterOptions}
              style={{ minWidth: '160px' }}
              aria-label="Filter by type"
            />
            {(searchTerm || typeFilter) && (
              <Button
                variant="subtle"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('');
                }}
              >
                Clear
              </Button>
            )}
          </Group>
          <Text size="xs" c="dimmed" mt="xs">
            {filtered.length} result{filtered.length === 1 ? '' : 's'}
          </Text>
        </Box>

        {filtered.length === 0 ? (
          <Paper p="xl" withBorder>
            <Text ta="center" c="dimmed">
              No components found matching &quot;{searchTerm}&quot;
            </Text>
          </Paper>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {filtered.map((item) => (
              <CatalogCard key={`${item.kind}:${item.name}`} item={item} size={args.size} />
            ))}
          </div>
        )}
      </Stack>
    );
  },
};
