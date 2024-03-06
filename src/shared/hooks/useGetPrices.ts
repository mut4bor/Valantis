import { useEffect } from 'react';
import { useGetPricesQuery } from 'shared/api/redux/slices/apiSlice';
import { GetPricesParams } from 'shared/api/redux';

export const useGetPrices = (args: GetPricesParams, skip?: boolean) => {
  const { offset, limit } = args;

  const { data, error, isError, refetch, isFetching } = useGetPricesQuery(
    {
      offset: offset,
      limit: limit,
    },
    {
      skip,
    }
  );

  useEffect(() => {
    if (isError || error) refetch();
  }, [isError, error, refetch]);

  return {
    data: data?.result,
    isFetching: isFetching,
  };
};
