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

export const StatusPanels: StoryObj<typeof Tab> = {
  name: "상태별 내용 전환",
  parameters: { layout: "centered" },
  args: {
    w: 320,
    defaultValue: "all",
    containerPaddingTop: "md",
    tabList: [
      { title: "전체", value: "all", body: "전체 내역 3건" },
      { title: "예약", value: "reserved", body: "예약 내역 2건" },
      { title: "완료", value: "completed", body: "완료 내역 1건" },
    ],
  },
};
