import {
  useGetIds,
  useGetPrices,
  useIsFetching,
  useBrandFilter,
  useProductFilter,
} from 'shared/hooks';
import { useAppSelector } from 'shared/api/redux';
import _ from 'lodash';

export const useIdsSortedByPrice = (
  reverse = false
): {
  productIds: string[];
  isFetching: boolean;
  price?: {
    min: number | undefined;
    max: number | undefined;
  };
} => {
  const { paginationValue } = useAppSelector((state) => state.pagination);
  const {
    filter: { brand },
    filterIsEmpty,
    priceInput: { priceInputMin, priceInputMax },
  } = useAppSelector((state) => state.sidebar);
  const priceIsEmpty = priceInputMin === 0 && priceInputMax === Infinity;

  const { productsToShow } = useAppSelector((state) => state.products);
  const { data: idsData, isFetching: idsIsFetching } = useGetIds({});
  const { data: pricesData, isFetching: pricesIsFetching } = useGetPrices({});
  const { data: brandFilterData, isFetching: brandFilterIsFetching } =
    useBrandFilter({ brand }, filterIsEmpty);
  const { data: productFilterData, isFetching: productFilterIsFetching } =
    useProductFilter();

  const isFetching = useIsFetching([
    idsIsFetching,
    pricesIsFetching,
    brandFilterIsFetching,
    productFilterIsFetching,
  ]);

  if (!idsData || !pricesData) {
    return { productIds: [], isFetching };
  }
  if (idsData.length !== pricesData.length) {
    console.error('idsData and pricesData have different length!');
    return { productIds: [], isFetching };
  }

  const idToPriceMap = new Map(
    idsData.map((id, index) => [id, pricesData[index]])
  );

  const sortIdArray = (arr: string[]): string[] => {
    const sortedArr = [...arr].sort((a, b) => {
      const price1 = idToPriceMap.get(a);
      const price2 = idToPriceMap.get(b);
      if (price1 === undefined || price2 === undefined) {
        return 0;
      }
      return price1 - price2;
    });

    return sortedArr;
  };

  const handleIdsReturn = (): string[] => {
    if (productFilterData.length) {
      return brandFilterData.length
        ? sortIdArray(productFilterData).filter((id) =>
            brandFilterData.includes(id)
          )
        : sortIdArray(productFilterData);
    }
    if (!filterIsEmpty && brandFilterData.length) {
      const sortedBrands = sortIdArray(brandFilterData);
      return sortedBrands;
    }
    return sortIdArray(idsData);
  };

  const uniqSortedIds = _.uniq(handleIdsReturn());

  const reversedOnBooleanUniqSortedIds = reverse
    ? uniqSortedIds.reverse()
    : uniqSortedIds;

  const filteredIdsByPrice = priceIsEmpty
    ? reversedOnBooleanUniqSortedIds
    : reversedOnBooleanUniqSortedIds.filter((id) => {
        const price = idToPriceMap.get(id);
        if (price === undefined) {
          return;
        }
        return price >= priceInputMin && price <= priceInputMax;
      });

  const uniqFilteredIdsByPrice = _.uniq(filteredIdsByPrice);

  const startPaginationIndex = (paginationValue - 1) * productsToShow;
  const endPaginationIndex = paginationValue * productsToShow;

  const uniqSortedIdsSlice = uniqFilteredIdsByPrice.slice(
    startPaginationIndex,
    endPaginationIndex
  );

  return {
    productIds: uniqSortedIdsSlice,
    isFetching,
    price: {
      min: idToPriceMap.get(uniqSortedIds[0]),
      max: idToPriceMap.get(uniqSortedIds[uniqSortedIds.length - 1]),
    },
  };
};
