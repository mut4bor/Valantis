import { useGetIdsQuery } from 'shared/api/redux/slices/apiSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { GetIdsParams } from 'shared/api/redux';

export const useGetIds = (args: GetIdsParams) => {
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
