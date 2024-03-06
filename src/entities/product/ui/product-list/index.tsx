import { ProductCard } from '../product-card';
import { useAppSelector } from 'shared/api/redux';
import { useGetItems, useIdsSortedByPrice } from 'shared/hooks';
import styled from './style.module.scss';

export function ProductList() {
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

  return (
    <ul className={styled.list}>
      {idsIsFetching || productsIsFetching
        ? Array.from({ length: productsToShow }).map((_, index) => (
            <ProductCard key={`placeholder-${index}`} />
          ))
        : products.map((productData) => (
            <ProductCard
              key={productData.id}
              data={{
                id: productData.id,
                name: productData.product,
                price: productData.price,
                brand: productData.brand,
              }}
            />
          ))}
    </ul>
  );
}
