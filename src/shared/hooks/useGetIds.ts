import { useGetIdsQuery } from 'shared/api/redux/slices/APISlice';
import _ from 'lodash';
import { useEffect } from 'react';

export const useGetIds = (args: { offset?: number; limit?: number }) => {
  const { offset, limit } = args;
  const { data, isError, refetch, error, isFetching } = useGetIdsQuery({
    offset: offset,
    limit: limit,
  });

  useEffect(() => {
    if (isError || error) refetch;
  }, [isError, error, refetch]);

  const filteredIdsData = _.uniq(data?.result);
  return {
    data: filteredIdsData,
    isFetching: isFetching,
  };
};
