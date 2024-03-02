import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import { useGetIdsQuery, useGetItemsQuery } from 'shared/redux/slices/APISlice'; // Подставьте правильный путь к вашим RTK Query
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/redux/hooks';
import { isDisabledChanged } from 'shared/redux/slices/PaginationSlice';

export function ProductList() {
  const dispatch = useAppDispatch();

  const PaginationValue = useAppSelector((state) => state.pagination.value);

  const productsToShow = useAppSelector(
    (state) => state.settings.productsToShow
  );

  const {
    data: idsData,
    error: idsError,
    refetch: idsRefetch,
    isFetching: idsIsFetching,
  } = useGetIdsQuery({
    offset: (PaginationValue - 1) * productsToShow,
    limit: productsToShow,
  });

  const filteredIdsData = _.uniq(idsData?.result);

  const {
    data: itemsData,
    error: itemsError,
    refetch: itemsRefetch,
    isFetching: itemsIsFetching,
  } = useGetItemsQuery({ ids: filteredIdsData });

  const filteredItemsData = _.uniqBy(
    itemsData?.result,
    (itemData) => itemData.id
  );

  useEffect(() => {
    if (idsError) idsRefetch();
    if (itemsError) itemsRefetch();
  }, [idsError, itemsError, idsRefetch, itemsRefetch]);

  const isFetching = (): boolean => {
    return idsIsFetching || itemsIsFetching;
  };

  useEffect(() => {
    dispatch(isDisabledChanged(isFetching()));
  }, [idsIsFetching, itemsIsFetching]);

  return (
    <>
      {isFetching()
        ? [...Array(50)].map((_, index) => (
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
    </>
  );
}
