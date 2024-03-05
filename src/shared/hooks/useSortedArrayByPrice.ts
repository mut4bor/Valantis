import { useGetIds, useGetFields } from 'shared/hooks';
import _ from 'lodash';

interface Item {
  id: string;
  price: string;
}

export const useSortedArrayByPrice = (): Item[] => {
  const { data: idsData, isFetching: idsIsFetching } = useGetIds({});
  const { data: pricesData, isFetching: pricesIsFetching } = useGetFields({
    field: 'price',
  });

  if (pricesData) {
    const objects = idsData.map((id, index) => ({
      id,
      price: pricesData[index],
    }));
    const sortedObjects = objects.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    console.log(sortedObjects);
    return sortedObjects;
  }

  return [];
};
