import _ from 'lodash';
import { useEffect } from 'react';
import { FilterParams, useAppSelector, useFilterQuery } from 'shared/api/redux';

export const useFilter = (field: FilterParams, skip?: boolean) => {
  const { brand } = field;
  const { filterIsEmpty } = useAppSelector((state) => state.sidebar);

  const { data, isError, refetch, error, isFetching } = useFilterQuery(
    { brand: brand },
    {
      skip: skip,
    }
  );

  useEffect(() => {
    if (!filterIsEmpty && (isError || error)) refetch();
  }, [isError, error, refetch]);

  const filteredIdsData = _.uniq(data?.result);
  return {
    data: filteredIdsData,
    isFetching: isFetching,
  };
};
