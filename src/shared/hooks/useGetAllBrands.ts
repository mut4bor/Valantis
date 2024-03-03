import _ from 'lodash';
import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/APISlice';

export const useGetAllBrands = (): string[] => {
  const { data, isError, refetch } = useGetFieldsQuery({
    field: 'brand',
  });

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  const filteredFields = _.uniq(data?.result);
  console.log(filteredFields);
  return filteredFields;
};
