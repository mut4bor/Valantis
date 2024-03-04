import { useFilterQuery } from 'shared/api/redux';
import _ from 'lodash';
import { useEffect } from 'react';

export const useFilter = (filter: {
  brand?: string;
  price?: number;
  product?: string;
}) => {
  const { data, isError, refetch, error, isFetching } = useFilterQuery(filter);

  useEffect(() => {
    if (isError || error) refetch;
  }, [isError, error, refetch]);

  const filteredIdsData = _.uniq(data?.result);
  return {
    data: filteredIdsData,
    isFetching: isFetching,
  };
};
