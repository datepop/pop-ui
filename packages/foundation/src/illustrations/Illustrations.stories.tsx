import { Stack, Text, Paper, Box, TextInput, Button, Group, Select } from '@mantine/core';
import React, { useState } from 'react';
import type { IIllustrationProps } from '../types/illustration';
import type { Meta, StoryObj } from '@storybook/react-vite';

const illustrationModules = import.meta.glob<{ default: React.FC<IIllustrationProps> }>(
  './Illustration*.tsx',
  { eager: true },
);

const illustrationList = Object.entries(illustrationModules)
  .map(([path, module]) => {
    const name = path.replace('./', '').replace('.tsx', '');
    return { name, component: module.default };
  })
  .filter((item) => !item.name.includes('.stories'))
  .sort((a, b) => a.name.localeCompare(b.name));

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
}> = ({ name, Illustration, size = 48 }) => {
  const [copied, setCopied] = useState(false);
  const colorOptions = (Illustration as any).colorOptions as string[] | undefined;
  const [selectedColor, setSelectedColor] = useState(colorOptions?.[0]);

  const handleCopy = async () => {
    const props = [
      size !== 48 ? `size={${size}}` : '',
      selectedColor ? `color="${selectedColor}"` : '',
    ]
      .filter(Boolean)
      .join(' ');
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
          <Illustration size={size} color={selectedColor} />
        </Box>
        <Stack gap="xs" align="center">
          <Text size="sm" fw={600}>
            {name}
          </Text>
          {colorOptions && (
            <Select
              size="xs"
              data={colorOptions}
              value={selectedColor}
              onChange={(value) => value && setSelectedColor(value)}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100px' }}
            />
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

    const filtered = illustrationList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Illustrations
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Click any card to copy its import code.
          </Text>
          <Group gap="md">
            <TextInput
              placeholder="Search illustrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, maxWidth: '400px' }}
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
              />
            ))}
          </div>
        )}
      </Stack>
    );
  },
};
