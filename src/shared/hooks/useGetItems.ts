import { useGetItemsQuery } from 'shared/api/redux/slices/APISlice';
import _ from 'lodash';
import { useEffect } from 'react';

export const useGetItems = (args: { ids: string[] }) => {
  const { ids } = args;
  const { data, isError, refetch, error, isFetching } = useGetItemsQuery({
    ids: ids,
  });

  useEffect(() => {
    if (isError || error) refetch;
  }, [isError, error, refetch]);

  const filteredItemsData = _.uniqBy(data?.result, (itemData) => itemData.id);
  return {
    data: filteredItemsData,
    isFetching: isFetching,
  };
};
