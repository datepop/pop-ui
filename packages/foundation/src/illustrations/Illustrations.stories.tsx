import { Stack, Text, Paper, Box, TextInput, Button, Group, Select } from '@mantine/core';
import React, { useState } from 'react';
import { illustrationMetadata, IllustrationCategory } from './metadata';
import type { IIllustrationProps } from '../types/illustration';
import type { Meta, StoryObj } from '@storybook/react-vite';

const illustrationModules = import.meta.glob<{ default: React.FC<IIllustrationProps> }>(
  './Illustration*.tsx',
  { eager: true },
);

const illustrationList = Object.entries(illustrationModules)
  .map(([path, module]) => {
    const name = path.replace('./', '').replace('.tsx', '');
    const meta = illustrationMetadata[name as keyof typeof illustrationMetadata];
    return {
      name,
      component: module.default,
      categories: meta?.categories ?? [],
    };
  })
  .filter((item) => !item.name.includes('.stories'))
  .sort((a, b) => a.name.localeCompare(b.name));

const categoryOptions: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  ...Object.entries(IllustrationCategory).map(([key, value]) => ({ value, label: key })),
];

const meta: Meta = {
  title: 'Foundation/Illustrations',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

const IllustrationCard: React.FC<{
  name: string;
  Illustration: React.FC<IIllustrationProps>;
  size?: number;
  categories: readonly IllustrationCategory[];
}> = ({ name, Illustration, size = 48, categories }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const props = size !== 48 ? `size={${size}} ` : '';
    const code = `import { ${name} } from '@pop-ui/foundation';\n\n<${name} ${props}/>`;
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
          <Illustration size={size} />
        </Box>
        <Stack gap="xs" align="center">
          <Text size="sm" fw={600}>
            {name}
          </Text>
          {categories.length > 0 && (
            <Group gap={4} justify="center">
              {categories.map((c) => (
                <Text key={c} size="xs" c="dimmed" style={{ textTransform: 'capitalize' }}>
                  {c}
                </Text>
              ))}
            </Group>
          )}
          <Text size="xs" c="dimmed">
            {copied ? 'Copied!' : 'Click to copy'}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const AllIllustrations: StoryObj<{ size: number }> = {
  args: { size: 24 },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
      description: 'Illustration size in pixels',
    },
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filtered = illustrationList.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        !categoryFilter ||
        (item.categories as readonly string[]).includes(categoryFilter);
      return matchSearch && matchCategory;
    });

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Illustrations
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Click any card to copy its import code.
          </Text>
          <Group gap="md" wrap="wrap">
            <TextInput
              placeholder="Search illustrations..."
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

        {filtered.length === 0 ? (
          <Paper p="xl" withBorder>
            <Text ta="center" c="dimmed">
              No illustrations found matching &quot;{searchTerm}&quot;
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
              <IllustrationCard
                key={item.name}
                name={item.name}
                Illustration={item.component}
                size={args.size}
                categories={item.categories}
              />
            ))}
          </div>
        )}
      </Stack>
    );
  },
};