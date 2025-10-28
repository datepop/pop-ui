/**
 * Color Palette Component
 *
 * 디자인 시스템의 모든 색상을 시각적으로 표시
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  Group,
  Badge,
} from '@mantine/core';
import { colors, colorNames, getCSSVariableName } from './tokens';

interface ColorChipProps {
  colorName: string;
  shade: string;
  value: string;
}

const ColorChip: React.FC<ColorChipProps> = ({ colorName, shade, value }) => {
  const [copied, setCopied] = useState(false);
  const cssVarName = getCSSVariableName(colorName, shade);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isLight = parseInt(value.replace('#', ''), 16) > 0xffffff / 2;

  return (
    <Tooltip
      label={copied ? 'Copied!' : 'Click to copy HEX'}
      position="top"
      withArrow
    >
      <Paper
        p="md"
        style={{
          backgroundColor: value,
          cursor: 'pointer',
          border: '1px solid #e0e0e0',
          minHeight: '120px',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onClick={handleCopy}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Stack gap="xs">
          <Badge
            size="sm"
            variant="filled"
            style={{
              backgroundColor: isLight ? '#333' : '#fff',
              color: isLight ? '#fff' : '#333',
            }}
          >
            {shade}
          </Badge>
          <Text
            size="xs"
            fw={600}
            style={{ color: isLight ? '#333' : '#fff' }}
          >
            {value.toUpperCase()}
          </Text>
          <Text
            size="xs"
            style={{ color: isLight ? '#666' : '#ccc', fontFamily: 'monospace' }}
          >
            {cssVarName}
          </Text>
        </Stack>
      </Paper>
    </Tooltip>
  );
};

interface ColorGroupProps {
  colorName: string;
}

const ColorGroup: React.FC<ColorGroupProps> = ({ colorName }) => {
  const shades = colors[colorName];
  const shadeEntries = Object.entries(shades);

  return (
    <Box mb="xl">
      <Group mb="md" align="center">
        <Title order={3} tt="capitalize">
          {colorName}
        </Title>
        <Badge variant="light">{shadeEntries.length} shades</Badge>
      </Group>
      <Grid gutter="md">
        {shadeEntries.map(([shade, value]) => (
          <Grid.Col key={shade} span={{ base: 12, xs: 6, sm: 4, md: 3, lg: 2 }}>
            <ColorChip colorName={colorName} shade={shade} value={value} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export const ColorPalette: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} mb="xs">
            Color Palette
          </Title>
          <Text c="dimmed" size="sm">
            Click on any color chip to copy its HEX code
          </Text>
        </Box>
        {colorNames.map((colorName) => (
          <ColorGroup key={colorName} colorName={colorName} />
        ))}
      </Stack>
    </Container>
  );
};
