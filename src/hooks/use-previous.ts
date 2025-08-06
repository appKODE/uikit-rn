import { useEffect, useRef } from 'react';

/**
 * Check value and return previous value.
 *
 * @param value value for checking
 * @param options settings for hook
 * @returns previous value
 */
export const usePrevious = <T>(
  value: T,
  options: {
    /**
     * initial render return value
     */
    initialValueAsPrevious?: boolean;
  } = {}
) => {
  const ref = useRef<T | undefined>(
    options?.initialValueAsPrevious ? value : undefined
  );

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
