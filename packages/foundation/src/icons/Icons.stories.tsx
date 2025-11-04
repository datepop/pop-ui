import {
  Stack,
  Text,
  Paper,
  Group,
  TextInput,
  Button,
  Box,
} from "@mantine/core";
import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

const iconModules = import.meta.glob<{ default: React.FC<any> }>(
  "./Icon*.tsx",
  { eager: true },
);
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
} from "../tokens/colors";

const colorPalette = {
  "Gray 900": ColorGray900,
  "Gray 0": ColorGray0,
  "Gray 500": ColorGray500,
  "Aqua 500": ColorAqua500,
  "Aqua 600": ColorAqua600,
  "Red 500": ColorRed500,
  "Orange 500": ColorOrange500,
  "Yellow 500": ColorYellow500,
  "Green 500": ColorGreen500,
  "Blue 500": ColorBlue500,
  "Purple 500": ColorPurple500,
  "Grape 500": ColorGrape500,
};

const iconList = Object.entries(iconModules)
  .map(([path, module]) => {
    const name = path.replace("./", "").replace(".tsx", "");
    return {
      name,
      component: module.default,
      defaultSize: 24,
    };
  })
  .filter((icon) => !icon.name.includes(".stories"))
  .sort((a, b) => a.name.localeCompare(b.name));

const meta: Meta = {
  title: "Foundation/Icons",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

const IconCard: React.FC<{
  name: string;
  Icon: React.FC<any>;
  defaultSize: number;
  size?: number;
  color?: string;
  filled?: boolean;
}> = ({ name, Icon, defaultSize, size, color, filled }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `import { ${name} } from '@pop-ui/foundation';\n\n<${name} ${size && size !== defaultSize ? `size={${size}} ` : ""}${color && color !== ColorGray900 ? `color="${color}" ` : ""}${filled ? `filled={${filled}} ` : ""}/>`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Paper
      p="lg"
      withBorder
      style={{
        cursor: "pointer",
        transition: "all 0.2s",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={handleCopy}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Stack gap="md" align="center">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <Icon
            size={size || defaultSize}
            color={color || ColorGray900}
            filled={filled}
          />
        </Box>
        <Stack gap="xs" align="center">
          <Text size="sm" fw={600}>
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {copied ? "Copied!" : "Click to copy"}
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
  filled?: boolean;
}> = {
  args: {
    size: 24,
    color: ColorGray900,
    filled: false,
  },
  argTypes: {
    size: {
      control: { type: "range", min: 8, max: 64, step: 4 },
      description: "Icon size in pixels",
    },
    color: {
      control: {
        type: "color",
        presetColors: Object.values(colorPalette),
      },
      description: "Icon fill color",
    },
    filled: {
      control: { type: "boolean" },
      description:
        "Whether the icon should be filled (for icons that support this)",
    },
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredIcons = iconList.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <Stack gap="xl" p="md">
        <Box>
          <Text size="xl" fw={700} mb="xs">
            All Icons
          </Text>
          <Text size="sm" c="dimmed" mb="lg">
            Click any icon card to copy its import code. Use the controls panel
            to adjust size and color.
          </Text>
          <Group gap="md">
            <TextInput
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, maxWidth: "400px" }}
            />
            {searchTerm && (
              <Button variant="subtle" onClick={() => setSearchTerm("")}>
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
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
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
                filled={args.filled}
              />
            ))}
          </div>
        )}

        <Paper p="lg" withBorder style={{ backgroundColor: "#f8f9fa" }}>
          <Text size="sm" fw={600} mb="sm">
            Usage Example
          </Text>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "12px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            {`import { IconChevronDown, IconStar } from '@pop-ui/foundation';

// Basic usage
<IconChevronDown />
<IconChevronDown size={32} />
<IconChevronDown color="#1971C2" />

// With filled (for icons that support it)
<IconStar filled={true} color="#FFD700" />
<IconStar filled={false} />`}
          </pre>
        </Paper>
      </Stack>
    );
  },
};
