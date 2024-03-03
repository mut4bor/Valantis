import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import {
  useGetIdsQuery,
  useGetItemsQuery,
} from 'shared/api/redux/slices/APISlice';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/api/redux/hooks';
import { isDisabledChanged } from 'shared/api/redux/slices/PaginationSlice';
import { useHandleFetchError } from 'shared/hooks/useHandleFetchError';

export function ProductList() {
  const dispatch = useAppDispatch();

  const { value: paginationValue } = useAppSelector(
    (state) => state.pagination
  );

  const productsToShow = useAppSelector(
    (state) => state.settings.productsToShow
  );

  const {
    data: idsData,
    isError: idsIsError,
    refetch: idsRefetch,
    isFetching: idsIsFetching,
  } = useGetIdsQuery({
    offset: (paginationValue - 1) * productsToShow,
    limit: productsToShow,
  });

  const filteredIdsData = _.uniq(idsData?.result);

  const {
    data: itemsData,
    isError: itemsIsError,
    refetch: itemsRefetch,
    isFetching: itemsIsFetching,
  } = useGetItemsQuery({ ids: filteredIdsData });

  const filteredItemsData = _.uniqBy(
    itemsData?.result,
    (itemData) => itemData.id
  );

  useHandleFetchError(idsIsError, idsRefetch);
  useHandleFetchError(itemsIsError, itemsRefetch);

  const isFetching = (): boolean => {
    return idsIsFetching || itemsIsFetching;
  };

  useEffect(() => {
    dispatch(isDisabledChanged(isFetching()));
  }, [idsIsFetching, itemsIsFetching, isFetching]);

  return (
    <ul>
      {isFetching()
        ? [...Array(productsToShow)].map((_, index) => (
            <ProductCardContainer key={index}>
              <ProductCard />
            </ProductCardContainer>
          ))
        : filteredItemsData.map((data, index) => (
            <ProductCardContainer key={index}>
              <ProductCard
                data={{
                  id: data.id,
                  name: data.product,
                  price: data.price,
                  brand: data.brand,
                }}
              />
            </ProductCardContainer>
          ))}
    </ul>
  );
}
