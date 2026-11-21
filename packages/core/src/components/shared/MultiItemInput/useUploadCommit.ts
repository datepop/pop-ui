import { useIsomorphicEffect } from '@mantine/hooks';
import { useRef } from 'react';

// File parsing and cropping can finish after the uploader has changed or unmounted.
export function useUploadCommit<TArgs extends unknown[]>(commit: (...args: TArgs) => void) {
  const latest = useRef<typeof commit | null>(null);
  useIsomorphicEffect(() => {
    latest.current = commit;
    return () => {
      latest.current = null;
    };
  }, [commit]);
  return (...args: TArgs) => latest.current?.(...args);
}
