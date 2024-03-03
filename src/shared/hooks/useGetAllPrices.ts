import _ from 'lodash';
import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/APISlice';

export const useGetAllPrices = (): string[] => {
  const { data, isError, refetch } = useGetFieldsQuery({
    field: 'price',
  });

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  const filteredFields = _.uniq(data?.result);
  return filteredFields;
};
