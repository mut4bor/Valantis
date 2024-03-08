import {
  useGetIds,
  useGetPrices,
  useIsFetching,
  useBrandFilter,
  useProductFilter,
} from 'shared/hooks';
import { useAppSelector } from 'shared/api/redux';
import _ from 'lodash';

export const useIdsSortedByPrice = (reverse = false) => {
  const {
    filter: { brand },
    filterIsEmpty,
  } = useAppSelector((state) => state.sidebar);
  const { paginationValue } = useAppSelector((state) => state.pagination);
  const { priceMin, priceMax } = useAppSelector(
    (state) => state.sidebar.priceRange
  );
  const priceIsEmpty = priceMin === 0 && priceMax === Infinity;

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
    return { data: [], isFetching };
  }
  if (idsData.length !== pricesData.length) {
    console.log('idsData and pricesData have different length!');
    return { data: [], isFetching };
  }

  const idToPriceMap = new Map(
    idsData.map((id, index) => [id, pricesData[index]])
  );

  const sortIdArray = (arr: string[]) => {
    return [...arr].sort((a, b) => {
      const price1 = idToPriceMap.get(a);
      const price2 = idToPriceMap.get(b);
      if (price1 === undefined || price2 === undefined) {
        return 0;
      }
      return price1 - price2;
    });
  };

  const sortedIds = sortIdArray(idsData);
  const sortedBrandsIds = sortIdArray(brandFilterData);
  const sortedProductsIds = sortedBrandsIds.length
    ? sortIdArray(productFilterData).filter((id) =>
        sortedBrandsIds.includes(id)
      )
    : sortIdArray(productFilterData);

  const handleIdsReturn = (): string[] => {
    if (sortedProductsIds.length) {
      return sortedProductsIds;
    }
    if (!filterIsEmpty && sortedBrandsIds.length) {
      return sortedBrandsIds;
    }
    return sortedIds;
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
        return price >= priceMin && price <= priceMax;
      });

  const uniqFilteredIdsByPrice = _.uniq(filteredIdsByPrice);

  const startPaginationIndex = (paginationValue - 1) * productsToShow;
  const endPaginationIndex = paginationValue * productsToShow;

  const uniqSortedIdsSlice = uniqFilteredIdsByPrice.slice(
    startPaginationIndex,
    endPaginationIndex
  );

  return { data: uniqSortedIdsSlice, isFetching };
};
