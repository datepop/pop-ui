import { Pagination } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export const DefaultPagination: StoryObj<typeof Pagination> = {
  args: {
    currentPageIdx: 0,
    rowsPerPage: 10,
    totalLength: 50,
    paginationSize: 5,
  },
};
