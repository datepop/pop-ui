import { useState } from 'react';

import { StepNavigation } from '.';

import type { IStepNavigationStep } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const steps: IStepNavigationStep[] = [
  { value: 'account', label: '계정 정보' },
  { value: 'contract', label: '계약서 정보' },
  { value: 'shop', label: '제휴점 정보' },
  { value: 'balance', label: '밸런스 정보' },
  { value: 'product', label: '상품 정보' },
];

function Example({ isShopSelected = true }: { isShopSelected?: boolean }) {
  const [value, setValue] = useState('account');
  return (
    <StepNavigation
      steps={steps.map((step, index) => ({ ...step, disabled: !isShopSelected && index > 0 }))}
      value={value}
      onChange={setValue}
      ariaLabel="상품 등록 단계"
    />
  );
}

export default {
  title: 'Core/StepNavigation',
  component: StepNavigation,
} satisfies Meta<typeof StepNavigation>;

export const FiveSteps: StoryObj<typeof StepNavigation> = {
  render: () => <Example />,
};

export const SelectionRequired: StoryObj<typeof StepNavigation> = {
  render: () => <Example isShopSelected={false} />,
};
