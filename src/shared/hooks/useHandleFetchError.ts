import { useEffect } from 'react';

export const useHandleFetchError = (
  isError: boolean,
  error: object | undefined,
  refetchFunc: () => void
): void => {
  useEffect(() => {
    if (error || isError) refetchFunc;
  }, [error, refetchFunc]);
};
