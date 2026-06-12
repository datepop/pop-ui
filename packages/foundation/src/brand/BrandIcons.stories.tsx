import { Stack, Text, Paper, Box, TextInput, Button, Group } from '@mantine/core';
import React, { useState } from 'react';

import type { IBrandIconProps } from '../types/brand';
import type { Meta, StoryObj } from '@storybook/react-vite';

const brandModules = import.meta.glob<{ default: React.FC<IBrandIconProps> }>('./Icon*.tsx', {
  eager: true,
});

const brandList = Object.entries(brandModules)
  .map(([path, module]) => ({
    name: path.replace('./', '').replace('.tsx', ''),
    component: module.default,
  }))
  .filter((item) => !item.name.includes('.stories'))
  .sort((a, b) => a.name.localeCompare(b.name));

const meta: Meta = {
  title: 'Foundation/BrandIcons',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

const BrandCard: React.FC<{
  name: string;
  Brand: React.FC<IBrandIconProps>;
  size?: number;
}> = ({ name, Brand, size = 48 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const props = size !== 24 ? `size={${size}} ` : '';
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
          <Brand size={size} />
        </Box>
        <Stack gap="xs" align="center">
          <Text size="sm" fw={600}>
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {copied ? 'Copied!' : 'Click to copy'}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const AllBrandIcons: StoryObj<{ size: number }> = {
  args: { size: 24 },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
      description: 'Brand icon size in pixels',
    },
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = brandList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Brand Icons
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Brand & social platform logos with fixed colors. Click any card to copy its import code.
          </Text>
          <Group gap="md" wrap="wrap">
            <TextInput
              placeholder="Search brand icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '200px', maxWidth: '400px' }}
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
              No brand icons found matching &quot;{searchTerm}&quot;
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
              <BrandCard key={item.name} name={item.name} Brand={item.component} size={args.size} />
            ))}
          </div>
        )}
      </Stack>
    );
  },
};
