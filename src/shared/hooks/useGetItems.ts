import { useGetItemsQuery } from 'shared/api/redux/slices/apiSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { GetItemsParams } from 'shared/api/redux';

export const useGetItems = (ids: GetItemsParams, skip?: boolean) => {
  const { data, isError, refetch, error, isFetching } = useGetItemsQuery(ids, {
    skip,
  });

  useEffect(() => {
    if (isError || error) refetch();
  }, [isError, error, refetch]);

  const filteredItemsData = _.uniqBy(data?.result, (itemData) => itemData.id);
  return {
    items: filteredItemsData,
    isFetching: isFetching,
  };
};
