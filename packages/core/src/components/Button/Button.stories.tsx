import { StoryFn, Meta } from "@storybook/react";
import { Button } from ".";

export default { title: "Core/Button", component: Button } as Meta<
  typeof Button
>;

export const Variants: StoryFn = (args) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
      <Button styleType="basic" size="md">
        {args.children || "Button"}
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
      <Button styleType="setting" size="md">
        {args.children || "Button"}
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
      <Button styleType="primary" size="md">
        {args.children || "Button"}
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
      <Button styleType="primaryLine" size="md">
        {args.children || "Button"}
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
      <Button styleType="warning" size="md">
        {args.children || "Button"}
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
      <Button styleType="danger" size="md">
        {args.children || "Button"}
      </Button>
    </div>
  </div>
);

Variants.args = { children: "Button" };

Variants.argTypes = {
  styleType: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
  isLoading: { table: { disable: true } },
  onClick: { table: { disable: true } },
};

export const LoadingStates: StoryFn = (args) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
      <Button styleType="basic" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
      <Button styleType="setting" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
      <Button styleType="primary" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
      <Button styleType="primaryLine" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
      <Button styleType="warning" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
      <Button styleType="danger" size="md" isLoading={args.isLoading}>
        Button
      </Button>
    </div>
  </div>
);

LoadingStates.args = {
  isLoading: false,
};

LoadingStates.argTypes = {
  children: { table: { disable: true } },
  styleType: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
  onClick: { table: { disable: true } },
};

export const Sizes: StoryFn = (args) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Basic</span>
      <Button styleType="basic" size={args.size}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Setting</span>
      <Button styleType="setting" size={args.size}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary</span>
      <Button styleType="primary" size={args.size}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Primary Line</span>
      <Button styleType="primaryLine" size={args.size}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Warning</span>
      <Button styleType="warning" size={args.size}>
        Button
      </Button>
    </div>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ minWidth: "120px", fontWeight: 600 }}>Danger</span>
      <Button styleType="danger" size={args.size}>
        Button
      </Button>
    </div>
  </div>
);

Sizes.args = {
  size: "md",
};

Sizes.argTypes = {
  children: { table: { disable: true } },
  styleType: { table: { disable: true } },
  disabled: { table: { disable: true } },
  isLoading: { table: { disable: true } },
  onClick: { table: { disable: true } },
};
