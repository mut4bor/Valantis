import _ from 'lodash';
import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/APISlice';

export const useGetAllBrands = (): string[] => {
  const { data, error, isError, refetch } = useGetFieldsQuery({
    field: 'brand',
  });

  useEffect(() => {
    if (isError || error) refetch();
  }, [isError, error, refetch]);

  const filteredFields = _.uniq(data?.result);
  return filteredFields;
};
