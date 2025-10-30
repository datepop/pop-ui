import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Stack,
  Text,
  Paper,
  Group,
  TextInput,
  Button,
  Box,
} from "@mantine/core";
import IconAnalytics from "./IconAnalytics";
import IconCalendar from "./IconCalendar";
import IconCamera from "./IconCamera";
import IconCheck from "./IconCheck";
import IconCheckCircle from "./IconCheckCircle";
import IconCheckSquare from "./IconCheckSquare";
import IconChevronDown from "./IconChevronDown";
import IconChevronLeft from "./IconChevronLeft";
import IconChevronRight from "./IconChevronRight";
import IconChevronRightDouble from "./IconChevronRightDouble";
import IconChevronUp from "./IconChevronUp";
import IconClock from "./IconClock";
import IconClose from "./IconClose";
import IconCloseCircle from "./IconCloseCircle";
import IconCompass from "./IconCompass";
import IconCopy from "./IconCopy";
import IconDown from "./IconDown";
import IconDragMenu from "./IconDragMenu";
import IconFilter from "./IconFilter";
import IconInfoCircle from "./IconInfoCircle";
import IconKebap from "./IconKebap";
import IconLink from "./IconLink";
import IconListMenu from "./IconListMenu";
import IconMap from "./IconMap";
import IconMapMarker from "./IconMapMarker";
import IconMenu from "./IconMenu";
import IconMoney from "./IconMoney";
import IconPhone from "./IconPhone";
import IconPhoneCall from "./IconPhoneCall";
import IconPhoto from "./IconPhoto";
import IconPlus from "./IconPlus";
import IconPlusCircle from "./IconPlusCircle";
import IconPlusSquare from "./IconPlusSquare";
import IconQuestionCircle from "./IconQuestionCircle";
import IconReset from "./IconReset";
import IconSales from "./IconSales";
import IconSearch from "./IconSearch";
import IconSetting from "./IconSetting";
import IconSquare from "./IconSquare";
import IconStar from "./IconStar";
import IconStore from "./IconStore";
import IconTicket from "./IconTicket";
import IconTrash from "./IconTrash";
import IconUp from "./IconUp";
import IconWarning from "./IconWarning";
import IconWarningCircle from "./IconWarningCircle";
import { ColorGray900 } from "../tokens/colors";

const iconList = [
  { name: "IconAnalytics", component: IconAnalytics, defaultSize: 24 },
  { name: "IconCalendar", component: IconCalendar, defaultSize: 24 },
  { name: "IconCamera", component: IconCamera, defaultSize: 24 },
  { name: "IconCheck", component: IconCheck, defaultSize: 24 },
  { name: "IconCheckCircle", component: IconCheckCircle, defaultSize: 24 },
  { name: "IconCheckSquare", component: IconCheckSquare, defaultSize: 24 },
  { name: "IconChevronDown", component: IconChevronDown, defaultSize: 24 },
  { name: "IconChevronLeft", component: IconChevronLeft, defaultSize: 24 },
  { name: "IconChevronRight", component: IconChevronRight, defaultSize: 24 },
  { name: "IconChevronRightDouble", component: IconChevronRightDouble, defaultSize: 24 },
  { name: "IconChevronUp", component: IconChevronUp, defaultSize: 24 },
  { name: "IconClock", component: IconClock, defaultSize: 24 },
  { name: "IconClose", component: IconClose, defaultSize: 24 },
  { name: "IconCloseCircle", component: IconCloseCircle, defaultSize: 24 },
  { name: "IconCompass", component: IconCompass, defaultSize: 24 },
  { name: "IconCopy", component: IconCopy, defaultSize: 24 },
  { name: "IconDown", component: IconDown, defaultSize: 24 },
  { name: "IconDragMenu", component: IconDragMenu, defaultSize: 24 },
  { name: "IconFilter", component: IconFilter, defaultSize: 24 },
  { name: "IconInfoCircle", component: IconInfoCircle, defaultSize: 24 },
  { name: "IconKebap", component: IconKebap, defaultSize: 24 },
  { name: "IconLink", component: IconLink, defaultSize: 24 },
  { name: "IconListMenu", component: IconListMenu, defaultSize: 24 },
  { name: "IconMap", component: IconMap, defaultSize: 24 },
  { name: "IconMapMarker", component: IconMapMarker, defaultSize: 24 },
  { name: "IconMenu", component: IconMenu, defaultSize: 24 },
  { name: "IconMoney", component: IconMoney, defaultSize: 24 },
  { name: "IconPhone", component: IconPhone, defaultSize: 24 },
  { name: "IconPhoneCall", component: IconPhoneCall, defaultSize: 24 },
  { name: "IconPhoto", component: IconPhoto, defaultSize: 24 },
  { name: "IconPlus", component: IconPlus, defaultSize: 24 },
  { name: "IconPlusCircle", component: IconPlusCircle, defaultSize: 24 },
  { name: "IconPlusSquare", component: IconPlusSquare, defaultSize: 24 },
  { name: "IconQuestionCircle", component: IconQuestionCircle, defaultSize: 24 },
  { name: "IconReset", component: IconReset, defaultSize: 24 },
  { name: "IconSales", component: IconSales, defaultSize: 24 },
  { name: "IconSearch", component: IconSearch, defaultSize: 24 },
  { name: "IconSetting", component: IconSetting, defaultSize: 24 },
  { name: "IconSquare", component: IconSquare, defaultSize: 24 },
  { name: "IconStar", component: IconStar, defaultSize: 24 },
  { name: "IconStore", component: IconStore, defaultSize: 24 },
  { name: "IconTicket", component: IconTicket, defaultSize: 24 },
  { name: "IconTrash", component: IconTrash, defaultSize: 24 },
  { name: "IconUp", component: IconUp, defaultSize: 24 },
  { name: "IconWarning", component: IconWarning, defaultSize: 24 },
  { name: "IconWarningCircle", component: IconWarningCircle, defaultSize: 24 },
];

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
}> = ({ name, Icon, defaultSize, size, color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = `import { ${name} } from '@pop-ui/foundation';\n\n<${name} ${size && size !== defaultSize ? `size={${size}} ` : ""}${color && color !== ColorGray900 ? `color="${color}" ` : ""}/>`;
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
          <Icon size={size || defaultSize} color={color || ColorGray900} />
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
}> = {
  args: {
    size: 24,
    color: ColorGray900,
  },
  argTypes: {
    size: {
      control: { type: "range", min: 8, max: 64, step: 4 },
      description: "Icon size in pixels",
    },
    color: {
      control: "color",
      description: "Icon color",
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
            Click any icon card to copy its import code. Use the controls panel to adjust size and color.
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
            {`import { IconChevronDown } from '@pop-ui/foundation';

<IconChevronDown />
<IconChevronDown size={32} />
<IconChevronDown color="#1971C2" />
<IconChevronDown size={20} color="#FA5252" />`}
          </pre>
        </Paper>
      </Stack>
    );
  },
};
