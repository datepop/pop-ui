import { Stack, Text, Paper, Group, TextInput, Button, Box, Select } from '@mantine/core';
import React, { useState } from 'react';

import {
  ColorGray900,
  ColorGray0,
  ColorGray500,
  ColorAqua500,
  ColorAqua600,
  ColorRed500,
  ColorOrange500,
  ColorYellow500,
  ColorGreen500,
  ColorBlue500,
  ColorPurple500,
  ColorGrape500,
} from '../tokens/colors';

import type { IIconProps } from '../types/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconMetadata, IconCategory } from './metadata';

const iconModules = import.meta.glob<{ default: React.FC<IIconProps> }>('./Icon*.tsx', {
  eager: true,
});

const colorPalette = {
  'Gray 900': ColorGray900,
  'Gray 0': ColorGray0,
  'Gray 500': ColorGray500,
  'Aqua 500': ColorAqua500,
  'Aqua 600': ColorAqua600,
  'Red 500': ColorRed500,
  'Orange 500': ColorOrange500,
  'Yellow 500': ColorYellow500,
  'Green 500': ColorGreen500,
  'Blue 500': ColorBlue500,
  'Purple 500': ColorPurple500,
  'Grape 500': ColorGrape500,
};

const iconList = Object.entries(iconModules)
  .map(([path, module]) => {
    const name = path.replace('./', '').replace('.tsx', '');
    const meta = name in iconMetadata ? iconMetadata[name as keyof typeof iconMetadata] : null;
    return {
      name,
      component: module.default,
      defaultSize: 24,
      categories: meta?.categories ?? [],
      variants: (meta?.variants ?? ['line']) as ('line' | 'filled')[],
    };
  })
  .filter((icon) => !icon.name.includes('.stories'))
  .sort((a, b) => a.name.localeCompare(b.name));

const categoryOptions: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  ...Object.entries(IconCategory).map(([key, value]) => ({ value, label: key })),
];

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

const IconCard: React.FC<{
  name: string;
  Icon: React.FC<IIconProps>;
  defaultSize: number;
  size?: number;
  color?: string;
  variant?: 'line' | 'filled';
  variants: ('line' | 'filled')[];
  categories: IconCategory[];
}> = ({ name, Icon, defaultSize, size, color, variant, variants, categories }) => {
  const [copied, setCopied] = useState(false);
  const effectiveVariant = variant && variants.includes(variant) ? variant : variants[0];

  const handleCopy = async () => {
    const code = `import { ${name} } from '@pop-ui/foundation';\n\n<${name} ${size && size !== defaultSize ? `size={${size}} ` : ''}${color && color !== ColorGray900 ? `color="${color}" ` : ''}${effectiveVariant && effectiveVariant !== 'line' ? `variant="${effectiveVariant}" ` : ''}/>`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
          <Icon size={size || defaultSize} color={color || ColorGray900} variant={effectiveVariant} />
        </Box>
        <Stack gap="xs" align="center">
          <Text size="sm" fw={600}>
            {name}
          </Text>
          {(categories.length > 0 || variants.length > 1) && (
            <Group gap={4} justify="center">
              {categories.map((c) => (
                <Text key={c} size="xs" c="dimmed" style={{ textTransform: 'capitalize' }}>
                  {c}
                </Text>
              ))}
              {variants.length > 1 && (
                <Text size="xs" c="dimmed">
                  {variants.join(' / ')}
                </Text>
              )}
            </Group>
          )}
          <Text size="xs" c="dimmed">
            {copied ? 'Copied!' : 'Click to copy'}
          </Text>
        </Stack>
      </Stack>
      <Stack gap={4}>
        <Text size="xs" c="dimmed">
          Default size: {defaultSize}px
        </Text>
        {size && size !== defaultSize && (
          <Text size="xs" c="dimmed">
            Current size: {size}px
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

export const AllIcons: StoryObj<{
  size: number;
  color: string;
  variant?: 'line' | 'filled';
}> = {
  args: {
    size: 24,
    color: '#333',
    variant: 'line',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 8, max: 64, step: 4 },
      description: 'Icon size in pixels',
    },
    color: {
      control: {
        type: 'color',
        presetColors: Object.values(colorPalette),
      },
      description: 'Icon fill color',
    },
    variant: {
      control: { type: 'select' },
      options: ['line', 'filled'],
      description: 'Icon variant style',
    },
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredIcons = iconList.filter((icon) => {
      const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter || icon.categories.includes(categoryFilter as IconCategory);
      return matchesSearch && matchesCategory;
    });

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Icons
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Click any icon card to copy its import code. Use the controls panel to adjust size and
            color.
          </Text>
          <Group gap="md" wrap="wrap">
            <TextInput
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '200px', maxWidth: '400px' }}
            />
            <Select
              placeholder="Category"
              value={categoryFilter}
              onChange={(v) => setCategoryFilter(v ?? '')}
              data={categoryOptions}
              style={{ minWidth: '140px' }}
              aria-label="Filter by category"
            />
            {searchTerm && (
              <Button variant="subtle" onClick={() => setSearchTerm('')}>
                Clear
              </Button>
            )}
          </Group>
        </Box>

        {filteredIcons.length === 0 ? (
          <Paper p="xl" withBorder>
            <Text ta="center" c="dimmed">
              No icons found matching &quot;{searchTerm}&quot;
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
            {filteredIcons.map((icon) => (
              <IconCard
                key={icon.name}
                name={icon.name}
                Icon={icon.component}
                defaultSize={icon.defaultSize}
                size={args.size}
                color={args.color}
                variant={args.variant}
                variants={icon.variants}
                categories={icon.categories}
              />
            ))}
          </div>
        )}

        <Paper p="lg" withBorder style={{ backgroundColor: '#f8f9fa' }}>
          <Text size="sm" fw={600} mb="sm">
            Usage Example
          </Text>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '12px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '13px',
            }}
          >
            {`import { IconChevronDown, IconChartBar } from '@pop-ui/foundation';

// Basic usage
<IconChevronDown />
<IconChevronDown size={32} />
<IconChevronDown color="#1971C2" />

// With variant (for icons that support it)
<IconChartBar variant="line" />
<IconChartBar variant="filled" color="#FFD700" />`}
          </pre>
        </Paper>
      </Stack>
    );
  },
};
