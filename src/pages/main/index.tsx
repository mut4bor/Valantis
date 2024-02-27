import {
  useFilterQuery,
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
} from 'shared/redux/slices/APISlice';
import styled from './style.module.scss';
import { useEffect } from 'react';

export function MainPage() {
  const { data, error, isLoading, refetch } = useGetIdsQuery();
  useEffect(() => {
    console.log(data);
    console.log(isLoading);
  }, [data, isLoading]);

  return (
    <div className={styled.container}>
      <div className="">rasa</div>
    </div>
  );
}
