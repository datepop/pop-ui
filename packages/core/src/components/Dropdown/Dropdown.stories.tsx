import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Dropdown } from ".";
import { FieldComparison, checkFieldHelp, fieldHelpText } from '../../../../../.storybook/examples/FieldComparison';
import {
  WidthComparison,
  checkComparisonWidth,
} from '../../../../../.storybook/examples/WidthComparison';
import { TextField } from '../TextField';

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Dropdown",
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export const DefaultDropdown: StoryObj<typeof Dropdown> = {
  args: {
    label: "label text",
    labelPosition: "top",
    size: "md",
    required: false,
    disabled: false,
    data: ["select 1", "select 2", "select 3"],
  },
};

export const CategorySelection: StoryObj<typeof Dropdown> = {
  name: "분류 선택",
  tags: ['pop-ui-contract'],
  parameters: { layout: "centered" },
  args: {
    label: "분류",
    placeholder: "옵션 선택",
    size: "md",
    data: ["전체", "예약", "완료"],
    defaultValue: "예약",
    allowDeselect: false,
    w: 280,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Dropdown {...args} />
      <TextField label="검색어" />
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByLabelText('분류');
    const search = canvas.getByLabelText('검색어');
    const page = within(canvasElement.ownerDocument.body);
    const preview = async (key: 'ArrowDown' | 'ArrowUp', value: string) => {
      await userEvent.keyboard('{Enter}');
      const option = await page.findByRole('option', { name: value });
      await userEvent.keyboard(`{${key}}`);
      await expect(trigger).toHaveAttribute('aria-activedescendant', option.id);
      await expect(option).toHaveAttribute('data-combobox-selected');
    };
    const closed = () => waitFor(() => expect(page.queryByRole('listbox')).toBeNull());

    trigger.focus();
    await preview('ArrowDown', '완료');
    await expect(page.getByRole('option', { name: '예약' })).toHaveAttribute('data-checked');
    await userEvent.keyboard('{Escape}');
    await closed();
    await expect(trigger).toHaveValue('예약');
    await expect(trigger).toHaveFocus();
    await preview('ArrowDown', '완료');
    await userEvent.tab();
    await closed();
    await expect(search).toHaveFocus();
    await expect(trigger).toHaveValue('예약');
    await userEvent.tab({ shift: true });
    await preview('ArrowDown', '완료');
    await userEvent.keyboard('{Enter}');
    await closed();
    await expect(trigger).toHaveValue('완료');
    await expect(trigger).toHaveFocus();
    await preview('ArrowUp', '예약');
    await userEvent.keyboard('{Enter}');
    await closed();
    await expect(trigger).toHaveValue('예약');
  },
};

export const MenuPlacement: StoryObj<typeof Dropdown> = {
  name: '메뉴 열림 방향',
  parameters: { layout: 'centered' },
  args: CategorySelection.args,
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Dropdown {...args} label="위로 열기" comboboxProps={{ position: 'top-start' }} />
      <Dropdown {...args} label="아래로 열기" />
    </div>
  ),
};

export const ContentAtDifferentWidths: StoryObj<typeof Dropdown> = {
  name: '너비별 콘텐츠',
  tags: ['pop-ui-contract'],
  parameters: { layout: 'padded' },
  play: async (context) => {
    for (const column of await checkComparisonWidth(context)) {
      const field = within(column).getAllByRole('textbox')[0];
      await expect(
        within(column).getByText('예약에 사용할 분류를 한 개 선택해주세요.'),
      ).toBeVisible();
      await userEvent.click(field);
      const option = await within(column.ownerDocument.body).findByRole('option', {
        name: 'SeoulCityHallWeekendWalkingClub',
      });
      await expect(option.scrollWidth).toBeLessThanOrEqual(option.clientWidth + 1);
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(option).not.toBeVisible());
    }
  },
  render: () => (
    <WidthComparison>
      {['서울시청 근처에서 함께하는 주말 산책 모임', 'SeoulCityHallWeekendWalkingClub', ''].map(
        (value) => (
          <Dropdown
            key={value}
            label="분류"
            defaultValue={value || null}
            placeholder="옵션 선택"
            data={['서울시청 근처에서 함께하는 주말 산책 모임', 'SeoulCityHallWeekendWalkingClub']}
            error={value ? undefined : '예약에 사용할 분류를 한 개 선택해주세요.'}
          />
        ),
      )}
    </WidthComparison>
  ),
};

export const FieldFeedback: StoryObj<typeof Dropdown> = {
  name: '입력 상태와 피드백',
  tags: ['pop-ui-contract', 'pop-ui-field', 'pop-ui-help'],
  parameters: { layout: 'padded' },
  play: checkFieldHelp,
  render: () => (
    <FieldComparison
      renderField={(state, props) => (
        <Dropdown
          {...props}
          tooltip={state === 'default' ? fieldHelpText : undefined}
          data={['예약', '완료']}
          defaultValue={state === 'filled' ? '예약' : undefined}
          placeholder="옵션 선택"
        />
      )}
    />
  ),
};
