import _ from 'lodash';
import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/APISlice';

export const useGetFields = (args: {
  field: 'brand' | 'id' | 'price' | 'product';
  offset?: number;
  limit?: number;
}) => {
  const { field, offset, limit } = args;

  const { data, error, isError, refetch, isFetching } = useGetFieldsQuery({
    field: field,
    offset: offset,
    limit: limit,
  });

  useEffect(() => {
    if (isError || error) refetch();
  }, [isError, error, refetch]);

  const filteredFields = _.uniq(data?.result);
  return {
    data: filteredFields,
    isFetching: isFetching,
  };
};
