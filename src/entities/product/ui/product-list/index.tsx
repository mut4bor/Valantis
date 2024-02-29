import styled from './style.module.scss';
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
import { useAppSelector } from 'shared/redux/hooks';

export function ProductList() {
  const PaginationValue = useAppSelector((state) => state.pagination.value);

  const {
    data: idsData,
    error: idsError,
    isLoading: idsIsLoading,
    refetch: idsRefetch,
  } = useGetIdsQuery({ offset: (PaginationValue - 1) * 50, limit: 50 });

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

  const productQueries = useAppSelector((state) => state.productApi.queries);
  const dataStatus = Object.values(productQueries).slice(-1)[0]?.status;

  useEffect(() => {
    console.log(itemsIsLoading);
    console.log(idsIsLoading);
  }, [idsData, itemsData, PaginationValue]);
  return (
    <>
      <div className="">
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
      </div>
    </>
  );
}
