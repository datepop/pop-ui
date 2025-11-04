import { Button } from ".";

import type { IButtonProps } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export const Variants: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
        <Button variant="basic" size="md">
          {args.children || "Button"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
        <Button variant="setting" size="md">
          {args.children || "Button"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
        <Button variant="primary" size="md">
          {args.children || "Button"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
        <Button variant="primaryLine" size="md">
          {args.children || "Button"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
        <Button variant="warning" size="md">
          {args.children || "Button"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
        <Button variant="danger" size="md">
          {args.children || "Button"}
        </Button>
      </div>
    </div>
  ),
  args: {
    children: "Button",
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

export const LoadingStates: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
        <Button variant="basic" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
        <Button variant="setting" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
        <Button variant="primary" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
        <Button variant="primaryLine" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
        <Button variant="warning" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
        <Button variant="danger" size="md" isLoading={args.isLoading}>
          Button
        </Button>
      </div>
    </div>
  ),
  args: {
    isLoading: false,
  },
  argTypes: {
    children: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

export const Sizes: StoryObj<IButtonProps> = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
        <Button variant="basic" size={args.size}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
        <Button variant="setting" size={args.size}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
        <Button variant="primary" size={args.size}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
        <Button variant="primaryLine" size={args.size}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
        <Button variant="warning" size={args.size}>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
        <Button variant="danger" size={args.size}>
          Button
        </Button>
      </div>
    </div>
  ),
  args: {
    size: "md",
  },
  argTypes: {
    children: { table: { disable: true } },
    variant: { table: { disable: true } },
    disabled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};
