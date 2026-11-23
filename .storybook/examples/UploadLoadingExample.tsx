import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../../packages/core/src/components/Button';
import { Checkbox } from '../../packages/core/src/components/Checkbox';

import type { ReactNode } from 'react';

const uploadError = '파일을 3개 등록해주세요.';

export function UploadLoadingExample<
  T extends { id: string; position?: number; isLoading?: boolean },
>({
  initialItems,
  render,
}: {
  initialItems: T[];
  render: (props: {
    value: T[];
    onChange: (value: T[]) => void;
    isLoading: boolean;
    error?: string;
    length: number;
    width: number;
    height: number;
  }) => ReactNode;
}) {
  const [items, setItems] = useState(initialItems);
  const [allLoading, setAllLoading] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 20, padding: 20 }}>
      <Checkbox
        label="전체 파일 처리 중"
        size="sm"
        checked={allLoading}
        onChange={(event) => setAllLoading(event.currentTarget.checked)}
      />
      {render({
        value: items,
        onChange: setItems,
        isLoading: allLoading,
        error: items.length < 3 ? uploadError : undefined,
        length: 3,
        width: 90,
        height: 90,
      })}
      <Button
        variant="basic"
        size="sm"
        style={{ justifySelf: 'start' }}
        onClick={() => {
          setItems(initialItems);
          setAllLoading(false);
        }}
      >
        예시 초기화
      </Button>
    </div>
  );
}

export async function checkUploadLoading({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);
  const handles = () => canvas.getAllByRole('button', { name: '드래그로 순서 변경' });
  const deletes = () => canvas.getAllByRole('button', { name: /삭제$/ });
  const add = () => canvas.getByRole('button', { name: /^(파일 추가|Lottie 파일을 넣어주세요)$/ });
  const [busy, ready] = handles();
  await expect(busy).toBeDisabled();
  await expect(ready).toBeEnabled();
  await expect(deletes()[0]).toBeDisabled();
  await expect(deletes()[1]).toBeEnabled();
  await expect(add()).toHaveAccessibleDescription(uploadError);
  ready.focus();
  await userEvent.keyboard('[Space]');
  await waitFor(() => expect(ready).toHaveAttribute('aria-pressed', 'true'));
  await userEvent.keyboard('[ArrowRight]');
  await userEvent.keyboard('[Space]');
  // The empty third slot now precedes the moved file in the DOM.
  await waitFor(() =>
    expect(
      add().compareDocumentPosition(handles()[1]) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy(),
  );
  const loading = canvas.getByRole('checkbox', { name: '전체 파일 처리 중' });
  await userEvent.click(canvas.getByText('전체 파일 처리 중'));
  await expect(loading).toBeChecked();
  for (const control of [...handles(), ...deletes()]) await expect(control).toBeDisabled();
  await expect(add()).toHaveAttribute('aria-disabled', 'true');
  loading.focus();
  await userEvent.keyboard('[Space]');
  await expect(loading).not.toBeChecked();
  deletes()[1].focus();
  await userEvent.keyboard('[Enter]');
  await expect(deletes()).toHaveLength(1);
  await expect(deletes()[0]).toBeDisabled();
  await userEvent.click(loading);
  canvas.getByRole('button', { name: '예시 초기화' }).focus();
  await userEvent.keyboard('[Enter]');
  await expect(loading).not.toBeChecked();
  await expect(deletes()).toHaveLength(2);
  await expect(handles()[1]).toBeEnabled();
}
