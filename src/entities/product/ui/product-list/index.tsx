import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import {
  useFilterQuery,
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
} from 'shared/redux/slices/APISlice';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/redux/hooks';

export function ProductList() {
  const PaginationValue = useAppSelector((state) => state.pagination.value);
  const productQueries = useAppSelector((state) => state.productApi.queries);
  const dataStatus = Object.values(productQueries).slice(-1)[0]?.status;
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
  }, [idsData, itemsData, PaginationValue]);
  return (
    <>
      {!idsIsLoading && !itemsIsLoading && filteredItemsData ? (
        filteredItemsData.map((data, index) => (
          <ProductCardContainer key={index}>
            {dataStatus === 'fulfilled' && (
              <ProductCard
                data={{
                  id: data.id,
                  name: data.product,
                  price: data.price,
                  brand: data.brand,
                }}
              />
            )}
          </ProductCardContainer>
        ))
      ) : (
        <ProductCardContainer>
          <div className="loading-text">Загрузка</div>
        </ProductCardContainer>
      )}
    </>
  );
}
