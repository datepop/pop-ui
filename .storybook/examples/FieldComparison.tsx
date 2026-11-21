import { expect, userEvent, waitFor, within } from 'storybook/test';

import fieldStates from './field-states.json';
import { checkComparisonWidth, WidthComparison } from './WidthComparison';

import type { IFieldFeedbackProps } from '../../packages/core/src/components/shared/field';
import type { ReactNode } from 'react';

export const fieldHelpText = '예약 전에 내용을 확인하세요.';

const errorMessage = '예약을 진행하려면 입력한 내용을 다시 확인해주세요.';
const description = '예약에 사용하는 정보입니다.';

export function FieldComparison({
  renderField,
}: {
  renderField: (
    state: string,
    props: IFieldFeedbackProps & { label: string; disabled: boolean },
  ) => ReactNode;
}) {
  return (
    <WidthComparison>
      {fieldStates.map((state) => (
        <div key={state} data-field-state={state}>
          {renderField(state, {
            label: '예약 정보',
            description,
            required: true,
            disabled: state === 'disabled',
            error: state === 'error' ? errorMessage : undefined,
          })}
        </div>
      ))}
    </WidthComparison>
  );
}

export async function checkFieldComparison(context: { canvasElement: HTMLElement }) {
  for (const column of await checkComparisonWidth(context)) {
    const empty = within(
      column.querySelector<HTMLElement>('[data-field-state="default"]')!,
    ).getByLabelText(/^예약 정보\s*\*?$/);
    for (const state of fieldStates) {
      const sample = column.querySelector<HTMLElement>(`[data-field-state="${state}"]`)!;
      const field = within(sample).getByLabelText(/^예약 정보\s*\*?$/);
      const help = within(sample).getByText(description);
      const ids = field.getAttribute('aria-describedby')?.split(/\s+/);
      await expect(ids).toContain(help.id);
      await expect(
        field.hasAttribute('required') || field.getAttribute('aria-required') === 'true',
      ).toBe(true);
      await expect(field.hasAttribute('disabled')).toBe(state === 'disabled');
      await expect(field.getAttribute('aria-invalid') === 'true').toBe(state === 'error');
      if (state === 'filled') {
        if (field instanceof HTMLInputElement) {
          await expect(field.value).not.toBe('');
        } else {
          await expect(field.textContent?.trim()).toBeTruthy();
          await expect(field.textContent).not.toEqual(empty.textContent);
        }
      }
      if (state === 'error') {
        const error = within(sample).getByText(errorMessage);
        await expect(error).toBeVisible();
        await expect(ids).toContain(error.id);
        await expect(error.getBoundingClientRect().top).toBeGreaterThanOrEqual(
          help.getBoundingClientRect().bottom - 1,
        );
        await expect(error.scrollWidth).toBeLessThanOrEqual(error.clientWidth + 1);
      }
    }
  }
}

export async function checkFieldHelp(context: { canvasElement: HTMLElement }) {
  await checkFieldComparison(context);
  const body = within(context.canvasElement.ownerDocument.body);
  for (const sample of context.canvasElement.querySelectorAll<HTMLElement>(
    '[data-field-state="default"]',
  )) {
    const button = within(sample).getByRole('button', { name: '예약 정보 도움말' });
    within(sample).getByRole('textbox').focus();
    await userEvent.tab({ shift: true });
    await expect(button).toHaveFocus();
    const tooltip = await body.findByRole('tooltip');
    await expect(tooltip).toHaveTextContent(fieldHelpText);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tooltip).not.toBeInTheDocument());
  }
}
