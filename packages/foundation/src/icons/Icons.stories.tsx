import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Text, Paper, Group, TextInput, Button, Box, Badge } from '@mantine/core';
import IcChevronDown from './IcChevronDown';
import IcChevronUp from './IcChevronUp';
import IcChevronLeft from './IcChevronLeft';
import IcChevronRight from './IcChevronRight';
import { ColorGray900, ColorAqua500, ColorRed500, ColorBlue400, ColorGreen500 } from '../tokens/colors';

const iconList = [
  { name: 'IcChevronDown', component: IcChevronDown, defaultSize: 24 },
  { name: 'IcChevronUp', component: IcChevronUp, defaultSize: 24 },
  { name: 'IcChevronLeft', component: IcChevronLeft, defaultSize: 8 },
  { name: 'IcChevronRight', component: IcChevronRight, defaultSize: 8 },
];

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const IconCard: React.FC<{
  name: string;
  Icon: React.FC<any>;
  defaultSize: number;
  size?: number;
  color?: string;
}> = ({ name, Icon, defaultSize, size, color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `import { ${name} } from '@pop-ui/foundation';\n\n<${name} ${size && size !== defaultSize ? `size={${size}} ` : ''}${color && color !== ColorGray900 ? `color="${color}" ` : ''}/>`;
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
          <Icon size={size || defaultSize} color={color || ColorGray900} />
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

export const AllIcons: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = iconList.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Icons
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Click any icon card to copy its import code
          </Text>
          <Group gap="md">
            <TextInput
              placeholder="Search icons..."
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

        {filteredIcons.length === 0 ? (
          <Paper p="xl" withBorder>
            <Text ta="center" c="dimmed">
              No icons found matching "{searchTerm}"
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
            {`import { IcChevronDown } from '@pop-ui/foundation';

<IcChevronDown />
<IcChevronDown size={32} />
<IcChevronDown color="#1971C2" />
<IcChevronDown size={20} color="#FA5252" />`}
          </pre>
        </Paper>
      </Stack>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes = [16, 24, 32, 48];

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            Icon Sizes
          </Text>
          <Text size="sm" c="dimmed">
            Icons can be scaled to any size using the size prop
          </Text>
        </Box>

        {iconList.map((icon) => (
          <Paper key={icon.name} p="lg" withBorder>
            <Text size="md" fw={600} mb="md">
              {icon.name}
            </Text>
            <Group gap="xl" align="center">
              {sizes.map((size) => (
                <Stack key={size} gap="xs" align="center">
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
                    <icon.component size={size} />
                  </Box>
                  <Badge size="sm" variant="light">
                    {size}px
                  </Badge>
                </Stack>
              ))}
            </Group>
          </Paper>
        ))}
      </Stack>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const colors = [
      { name: 'Gray 900 (Default)', value: ColorGray900 },
      { name: 'Aqua 500', value: ColorAqua500 },
      { name: 'Red 500', value: ColorRed500 },
      { name: 'Blue 400', value: ColorBlue400 },
      { name: 'Green 500', value: ColorGreen500 },
    ];

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            Icon Colors
          </Text>
          <Text size="sm" c="dimmed">
            Icons accept any color value via the color prop
          </Text>
        </Box>

        {iconList.map((icon) => (
          <Paper key={icon.name} p="lg" withBorder>
            <Text size="md" fw={600} mb="md">
              {icon.name}
            </Text>
            <Group gap="xl" align="center">
              {colors.map((colorItem) => (
                <Stack key={colorItem.name} gap="xs" align="center">
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
                    <icon.component
                      size={icon.defaultSize}
                      color={colorItem.value}
                    />
                  </Box>
                  <Text size="xs" ta="center" style={{ maxWidth: '80px' }}>
                    {colorItem.name}
                  </Text>
                  <Text size="xs" c="dimmed" ff="monospace">
                    {colorItem.value}
                  </Text>
                </Stack>
              ))}
            </Group>
          </Paper>
        ))}
      </Stack>
    );
  },
};

export const Interactive: Story = {
  render: (args) => {
    const selectedIcon = iconList.find((icon) => icon.name === args.icon);
    const Icon = selectedIcon?.component || IcChevronDown;

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            Interactive Icon
          </Text>
          <Text size="sm" c="dimmed">
            Use the controls panel to adjust icon properties in real-time
          </Text>
        </Box>

        <Paper
          p="xl"
          withBorder
          style={{
            backgroundColor: args.backgroundColor || 'transparent',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={args.size} color={args.color} />
        </Paper>

        <Paper p="lg" withBorder style={{ backgroundColor: '#f8f9fa' }}>
          <Text size="sm" fw={600} mb="sm">
            Current Code
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
            {`import { ${args.icon} } from '@pop-ui/foundation';

<${args.icon}${args.size !== selectedIcon?.defaultSize ? ` size={${args.size}}` : ''}${args.color !== ColorGray900 ? ` color="${args.color}"` : ''} />`}
          </pre>
        </Paper>
      </Stack>
    );
  },
  args: {
    icon: 'IcChevronDown',
    size: 24,
    color: ColorGray900,
    backgroundColor: 'transparent',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: iconList.map((icon) => icon.name),
      description: 'Select an icon',
    },
    size: {
      control: { type: 'range', min: 8, max: 64, step: 4 },
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color for testing contrast',
    },
  },
};
