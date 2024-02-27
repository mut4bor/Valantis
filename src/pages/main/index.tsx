import {
  useFilterQuery,
  useGetIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
} from 'shared/redux/slices/APISlice';
import styled from './style.module.scss';
import { useEffect, useState } from 'react';
import { PaginationButton } from 'entities/pagination';
import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';

export function MainPage() {
  const { data, error, isLoading, refetch } = useGetIdsQuery();
  const paginationValue = useAppSelector((state) => state.pagination.value);
  useEffect(() => {
    console.log(data);
    console.log(isLoading);
  }, [data, isLoading]);

  return (
    <div className={styled.container}>
      <div className="">rasa</div>
      <div
        className=""
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <PaginationButton buttonType="decrement" />
        <div className="">{paginationValue}</div>
        <PaginationButton buttonType="increment" />
      </div>
    </div>
  );
}
