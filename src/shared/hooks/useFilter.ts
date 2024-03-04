import { useFilterQuery } from 'shared/api/redux';
import _ from 'lodash';
import { useEffect } from 'react';
import { FilterParams } from 'shared/api/redux';

export const useFilter = (args: FilterParams) => {
  const { data, isError, refetch, error, isFetching } = useFilterQuery(args);

  useEffect(() => {
    if (isError || error) refetch;
  }, [isError, error, refetch]);

  const filteredIdsData = _.uniq(data?.result);
  return {
    data: filteredIdsData,
    isFetching: isFetching,
  };
};
