import _ from 'lodash';
import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/api/redux/hooks';
import { isDisabledChanged } from 'shared/api/redux/slices/PaginationSlice';
import { filtersBooleanChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useIsFetching, useGetItems, useGetIds, useFilter } from 'shared/hooks';

export function ProductList() {
  const dispatch = useAppDispatch();

  const { filter, filterBoolean } = useAppSelector((state) => state.sidebar);
  const { brand, price, product } = filter;

  const { value: paginationValue } = useAppSelector(
    (state) => state.pagination
  );

  const productsToShow = useAppSelector(
    (state) => state.settings.productsToShow
  );

  const { data: idsData, isFetching: idsIsFetching } = useGetIds({
    offset: (paginationValue - 1) * productsToShow,
    limit: productsToShow,
  });

  useEffect(() => {
    const isFilterActive = brand !== '' || price !== 0 || product !== '';

    dispatch(filtersBooleanChanged(isFilterActive));
  }, [filter, dispatch]);

  const { data: filterData, isFetching: filterIsFetching } = useFilter(filter);

  const { data: itemsData, isFetching: itemsIsFetching } = useGetItems({
    ids: filterBoolean ? filterData : idsData,
  });

  const isFetching = useIsFetching(
    idsIsFetching,
    itemsIsFetching,
    filterIsFetching
  );

  useEffect(() => {
    dispatch(isDisabledChanged(isFetching));
  }, [isFetching, idsIsFetching, itemsIsFetching, filterIsFetching]);

  return (
    <ul>
      {isFetching
        ? [...Array(productsToShow)].map((_, index) => (
            <ProductCardContainer key={index}>
              <ProductCard />
            </ProductCardContainer>
          ))
        : itemsData.map((data, index) => (
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
