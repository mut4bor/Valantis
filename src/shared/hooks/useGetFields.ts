import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/apiSlice';
import { GetFieldsParams } from 'shared/api/redux';

export const useGetFields = (args: GetFieldsParams, skip?: boolean) => {
  const { field, offset, limit } = args;

  const { data, error, isError, refetch, isFetching } = useGetFieldsQuery(
    {
      field: field,
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
