import { ProductCard } from '../product-card';
import {
  useAppDispatch,
  useAppSelector,
  paginationDisabledChanged,
} from 'shared/api/redux';
import { useGetItems, useIdsSortedByPrice } from 'shared/hooks';
import styled from './style.module.scss';
import { useEffect } from 'react';

export function ProductList() {
  const dispatch = useAppDispatch();

  const {
    productsToShow,
    productsSort: { selectedSort },
  } = useAppSelector((state) => state.products);

  const { data: ids, isFetching: idsIsFetching } = useIdsSortedByPrice(
    selectedSort === 'priceHighToLow'
  );

  const { data: products, isFetching: productsIsFetching } = useGetItems({
    ids: ids,
  });

  useEffect(() => {
    const isDisabled =
      ids.length !== productsToShow || products.length !== productsToShow;
    dispatch(paginationDisabledChanged(isDisabled));
  }, [ids, products]);

  return (
    <ul className={styled.list}>
      {idsIsFetching || productsIsFetching ? (
        Array.from({ length: productsToShow }).map((_, index) => (
          <ProductCard key={`placeholder-${index}`} />
        ))
      ) : !products.length ? (
        <div className={styled.noData}>Товары отсутствуют</div>
      ) : (
        products.map((productData) => (
          <ProductCard
            key={productData.id}
            data={{
              id: productData.id,
              name: productData.product,
              price: productData.price,
              brand: productData.brand,
            }}
          />
        ))
      )}
    </ul>
  );
}
