import { useIsomorphicEffect } from '@mantine/hooks';
import { useMemo, useRef } from 'react';

// A new editing target must not receive files still being read for a previous one.
export function useUploadCommit<TArgs extends unknown[]>(
  commit: (...args: TArgs) => void,
  scope?: unknown,
) {
  const target = useMemo(() => ({ scope }), [scope]);
  const latest = useRef<{ target: typeof target; commit: typeof commit } | null>(null);
  useIsomorphicEffect(() => {
    latest.current = { target, commit };
    return () => {
      latest.current = null;
    };
  }, [target, commit]);
  return (...args: TArgs) => {
    if (latest.current?.target === target) latest.current.commit(...args);
  };
}
