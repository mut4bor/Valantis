import { ProductCard } from '../product-card';
import { ProductCardContainer } from '../product-card-container';
import { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  paginationDisabledChanged,
  radioboxDisabledChanged,
  ItemsResponse,
} from 'shared/api/redux';
import {
  useIsFetching,
  useGetItems,
  useGetIds,
  useFilter,
  useGetFields,
} from 'shared/hooks';
import _ from 'lodash';
import { useSortedArrayByPrice } from 'shared/hooks/useSortedArrayByPrice';

export function ProductList() {
  const dispatch = useAppDispatch();

  const { filter, filterIsEmpty } = useAppSelector((state) => state.sidebar);
  const { brand } = filter;

  const { value: paginationValue } = useAppSelector(
    (state) => state.pagination
  );

  const { productsToShow, productsSort } = useAppSelector(
    (state) => state.products
  );

  const { selectedSort } = productsSort;

  const { data: filterData, isFetching: filterIsFetching } = useFilter(
    { brand: brand },
    filterIsEmpty
  );

  const sort = useSortedArrayByPrice();
  interface Item {
    id: string;
    price: string;
  }

  function extractIds(array: Item[]): string[] {
    return array.map((item) => item.id);
  }

  function getItems(arr: string[]) {
    return arr.slice(
      (paginationValue - 1) * productsToShow,
      paginationValue * productsToShow
    );
  }

  const { data: itemsData, isFetching: itemsIsFetching } = useGetItems({
    ids: filterIsEmpty ? getItems(extractIds(sort)) : getItems(filterData),
  });
  console.log(itemsData);

  const isFetching = useIsFetching([itemsIsFetching, filterIsFetching]);

  useEffect(() => {
    dispatch(paginationDisabledChanged(isFetching));
    dispatch(radioboxDisabledChanged(isFetching));
  }, [isFetching, dispatch]);

  const handleItemsSort = () => {
    const priceSorted = itemsData.sort((a, b) => a.price - b.price);
    if (selectedSort === 'priceLowToHigh') {
      return priceSorted;
    }
    if (selectedSort === 'priceHighToLow') {
      return priceSorted.reverse();
    }
    return itemsData;
  };

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
