import { useCallback, useState } from 'react';

type AsyncAction<T extends unknown[] = any[]> = (
  ...args: T
) => Promise<void> | void;

export const useAsyncAction = <T extends unknown[] = []>(
  action?: AsyncAction<T> | null
) => {
  const [isAsyncLoading, setIsAsyncLoading] = useState(false);

  const asyncAction = useCallback(
    async (...args: T) => {
      if (!action) {
        return;
      }

      try {
        const result = action(...args);
        if (result instanceof Promise) {
          setIsAsyncLoading(true);
          await result;
        }
      } finally {
        setIsAsyncLoading(false);
      }
    },
    [action]
  );

  return { asyncAction, isAsyncLoading };
};
