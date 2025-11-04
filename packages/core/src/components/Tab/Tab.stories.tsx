import { Tab } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Tab",
  component: Tab,
} satisfies Meta<typeof Tab>;

export const DefaultTab: StoryObj<typeof Tab> = {
  args: {
    tabList: [
      {
        title: "tab title 1",
        value: "default tab 1",
        body: <>default tab body 1</>,
      },
      {
        title: "tab title 2",
        value: "default tab 2",
        body: <>default tab body 2</>,
      },
      {
        title: "tab title 3",
        value: "default tab 3",
        body: <>default tab body 3</>,
      },
    ],
    defaultValue: "default tab 1",
  },
};
