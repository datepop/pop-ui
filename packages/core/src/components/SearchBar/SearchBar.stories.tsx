import { SearchBar } from ".";
import { FieldComparison, checkFieldHelp, fieldHelpText } from '../../../../../.storybook/examples/FieldComparison';

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/SearchBar",
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export const DefaultSearchBar: StoryObj<typeof SearchBar> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
    data: ["select 1", "select 2", "select 3"],
  },
};

export const ClearQuery: StoryObj<typeof SearchBar> = {
  name: "검색어 지우기",
  parameters: { layout: "centered" },
  args: {
    label: "검색",
    placeholder: "검색어를 입력하세요",
    defaultValue: "예약",
    clearable: true,
    w: 280,
  },
};

export const FieldFeedback: StoryObj<typeof SearchBar> = {
  name: '입력 상태와 피드백',
  tags: ['pop-ui-contract', 'pop-ui-field', 'pop-ui-help'],
  parameters: { layout: 'padded' },
  play: checkFieldHelp,
  render: () => (
    <FieldComparison
      renderField={(state, props) => (
        <SearchBar
          {...props}
          tooltip={state === 'default' ? fieldHelpText : undefined}
          data={['서울시청', '서울숲']}
          defaultValue={state === 'filled' ? '서울시청' : undefined}
          placeholder="검색어 입력"
        />
      )}
    />
  ),
};
