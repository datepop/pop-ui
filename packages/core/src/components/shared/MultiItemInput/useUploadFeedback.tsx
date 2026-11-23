import { Input } from '@mantine/core';
import { useId } from 'react';

import type { ReactNode } from 'react';

export function useUploadFeedback(error: ReactNode) {
  const id = useId();
  const isError = Boolean(error);
  const errorId = isError && typeof error !== 'boolean' ? id : undefined;
  return {
    isError,
    errorId,
    message: errorId ? (
      <Input.Error id={errorId} mt={8}>
        {error}
      </Input.Error>
    ) : null,
  };
}
