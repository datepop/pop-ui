import { StoryFn, Meta } from "@storybook/react";
import { Tab } from ".";

export default {
  title: "Core/Tab",
  component: Tab,
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = (args) => <Tab {...args} />;

export const defaultTab = Template.bind({});
defaultTab.args = {
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
};
