import { useEffect } from 'react';

export const useHandleFetchError = (
  error: boolean | undefined,
  refetchFunc: () => void
): void => {
  useEffect(() => {
    if (error) refetchFunc;
  }, [error, refetchFunc]);
};
