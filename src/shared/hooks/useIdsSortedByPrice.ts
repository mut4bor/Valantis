import {
  useGetIds,
  useGetPrices,
  useIsFetching,
  useFilter,
} from 'shared/hooks';
import { useAppSelector } from 'shared/api/redux';
import _ from 'lodash';

export const useIdsSortedByPrice = (reverse = false) => {
  const {
    filter: { brand },
    filterIsEmpty,
  } = useAppSelector((state) => state.sidebar);
  const { value: paginationValue } = useAppSelector(
    (state) => state.pagination
  );
  const { priceMin, priceMax } = useAppSelector(
    (state) => state.sidebar.priceRange
  );
  const priceIsEmpty = priceMin === 0 && priceMax === Infinity;

  const { productsToShow } = useAppSelector((state) => state.products);
  const { data: idsData, isFetching: idsIsFetching } = useGetIds({});
  const { data: pricesData, isFetching: pricesIsFetching } = useGetPrices({});
  const { data: filterData, isFetching: filterIsFetching } = useFilter(
    { brand },
    filterIsEmpty
  );

  const isFetching = useIsFetching([
    idsIsFetching,
    pricesIsFetching,
    filterIsFetching,
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

  const sortedIds = [...idsData].sort((a, b) => {
    const priceA = idToPriceMap.get(a);
    const priceB = idToPriceMap.get(b);

    if (priceA === undefined || priceB === undefined) {
      return 0;
    }
    return priceA - priceB;
  });

  const sortedFilterIds = [...filterData].sort((id1, id2) => {
    const price1 = idToPriceMap.get(id1);
    const price2 = idToPriceMap.get(id2);
    if (price1 === undefined || price2 === undefined) {
      return 0;
    }
    return price1 - price2;
  });

  const uniqSortedIds = _.uniq(filterIsEmpty ? sortedIds : sortedFilterIds);

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
