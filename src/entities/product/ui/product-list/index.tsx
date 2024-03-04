import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  paginationDisabledChanged,
  radioboxDisabledChanged,
} from 'shared/api/redux';
import { useIsFetching, useGetItems, useGetIds, useFilter } from 'shared/hooks';

export function ProductList() {
  const dispatch = useAppDispatch();

  const { filter } = useAppSelector((state) => state.sidebar);
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

  const { data: filterData, isFetching: filterIsFetching } = useFilter(filter);

  const { data: itemsData, isFetching: itemsIsFetching } = useGetItems({
    ids: JSON.stringify(filter) === '{}' ? idsData : filterData,
  });

  console.log(JSON.stringify(filter));

  const isFetching = useIsFetching([
    idsIsFetching,
    itemsIsFetching,
    filterIsFetching,
  ]);

  useEffect(() => {
    dispatch(paginationDisabledChanged(isFetching));
    dispatch(radioboxDisabledChanged(isFetching));
  }, [isFetching, dispatch]);

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
