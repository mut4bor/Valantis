import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import {
  useFilterQuery,
  useGetIdsQuery,
  useGetItemsQuery,
} from 'shared/api/redux/slices/APISlice';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/api/redux/hooks';
import { isDisabledChanged } from 'shared/api/redux/slices/PaginationSlice';
import { useHandleFetchError } from 'shared/hooks/useHandleFetchError';
import { filtersBooleanChanged } from 'shared/api/redux/slices/sidebarSlice';

export function ProductList() {
  const dispatch = useAppDispatch();

  const { filter, filterBoolean } = useAppSelector((state) => state.sidebar);

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
    error: idsError,
    isFetching: idsIsFetching,
  } = useGetIdsQuery({
    offset: (paginationValue - 1) * productsToShow,
    limit: productsToShow,
  });

  useEffect(() => {
    if (filter.brand !== '' || filter.price !== 0 || filter.product !== '') {
      dispatch(filtersBooleanChanged(true));
    }
    if (filter.brand === '' || filter.price === 0 || filter.product === '') {
      dispatch(filtersBooleanChanged(false));
    }
  }, [filter, dispatch]);

  const {
    data: filterData,
    isError: filterIsError,
    refetch: filterRefetch,
    error: filterError,
    isFetching: filterIsFetching,
  } = useFilterQuery(filter);

  useHandleFetchError(filterIsError, filterError, filterRefetch);

  const filteredData = _.uniq(filterData?.result);

  const filteredIdsData = _.uniq(idsData?.result);

  const {
    data: itemsData,
    isError: itemsIsError,
    refetch: itemsRefetch,
    error: itemsError,
    isFetching: itemsIsFetching,
  } = useGetItemsQuery({ ids: filterBoolean ? filteredData : filteredIdsData });

  const filteredItemsData = _.uniqBy(
    itemsData?.result,
    (itemData) => itemData.id
  );

  useHandleFetchError(idsIsError, idsError, idsRefetch);
  useHandleFetchError(itemsIsError, itemsError, itemsRefetch);

  const isFetching = (): boolean => {
    return idsIsFetching || itemsIsFetching || filterIsFetching;
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
