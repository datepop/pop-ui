import { StoryFn, Meta } from "@storybook/react";
import { Pagination } from ".";

export default {
  title: "Core/Pagination",
  component: Pagination,
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;

export const defaultPagination = Template.bind({});
defaultPagination.args = {
  currentPageIdx: 0,
  rowsPerPage: 10,
  totalLength: 50,
  paginationSize: 5,
};
