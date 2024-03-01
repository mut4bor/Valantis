import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import { useGetIdsQuery, useGetItemsQuery } from 'shared/redux/slices/APISlice'; // Подставьте правильный путь к вашим RTK Query
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/redux/hooks';

export function ProductList() {
  const PaginationValue = useAppSelector((state) => state.pagination.value);

  const productsToShow = useAppSelector(
    (state) => state.pagination.productsToShow
  );

  const {
    data: idsData,
    error: idsError,
    isLoading: idsIsLoading,
    refetch: idsRefetch,
  } = useGetIdsQuery({
    offset: (PaginationValue - 1) * productsToShow,
    limit: productsToShow,
  });

  const filteredIdsData = _.uniq(idsData?.result);

  const {
    data: itemsData,
    error: itemsError,
    isLoading: itemsIsLoading,
    refetch: itemsRefetch,
  } = useGetItemsQuery({ ids: filteredIdsData });

  const filteredItemsData = _.uniqBy(
    itemsData?.result,
    (itemData) => itemData.id
  );

  useEffect(() => {
    console.log(itemsIsLoading);
    console.log(idsIsLoading);
  }, [itemsIsLoading, idsIsLoading]);

  useEffect(() => {
    if (idsError) idsRefetch();
    if (itemsError) itemsRefetch();
  }, [idsError, itemsError, idsRefetch, itemsRefetch]);

  return (
    <>
      {idsIsLoading || itemsIsLoading
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
