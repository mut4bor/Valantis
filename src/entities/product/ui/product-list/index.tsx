import styled from './style.module.scss';
import {
  useFilterQuery,
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
} from 'shared/redux/slices/APISlice';
import { useEffect } from 'react';

interface GetItemsParams {
  ids: string[] | null;
}

export function ProductList() {
  const {
    data: idsData,
    error: idsError,
    isLoading: idsIsLoading,
    refetch: idsRefetch,
  } = useGetIdsQuery();

  const idsArray = idsData ? Object.values(idsData.slice(0, 50)) : null;
  const params: GetItemsParams = { ids: idsArray };

  const {
    data: itemsData,
    error: itemsError,
    isLoading: itemsIsLoading,
    refetch: itemsRefetch,
  } = useGetItemsQuery(params);

  useEffect(() => {
    console.log(idsData);
    if (itemsData) {
      console.log(Object.values(itemsData)[0]);
    }
  }, [idsData, itemsData]);
  if (!itemsData) {
    return <div></div>;
  }
  return (
    <>
      {itemsData && (
        <>
          <div className="">
            {/* {Object.values(itemsData).map((data) => {
              return <div key={data.id + data.price}>{data.id}</div>;
            })} */}
          </div>
        </>
      )}
    </>
  );
}
