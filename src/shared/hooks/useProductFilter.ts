import { useEffect } from 'react';
import { useAppSelector, useFilterQuery } from 'shared/api/redux';

export const useProductFilter = () => {
  const { value } = useAppSelector((state) => state.products.productsInput);

  const productIsEmpty = value === '';

  const { data, isError, refetch, error, isFetching } = useFilterQuery(
    { product: value },
    {
      skip: productIsEmpty,
    }
  );

  useEffect(() => {
    if (!productIsEmpty && (isError || error)) refetch();
  }, [isError, error, refetch]);

  if (data === undefined) {
    return {
      data: [],
      isFetching: isFetching,
    };
  }

  return {
    data: data.result,
    isFetching: isFetching,
  };
};
