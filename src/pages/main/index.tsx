import { useFilterQuery } from 'shared/redux/slices/APISlice';
import styled from './style.module.scss';
import { useState } from 'react';

export function MainPage() {
  const [price, setPrice] = useState<number>(0);
  const { data, error, isLoading, refetch } = useFilterQuery({ price });
  console.log(data);
  return (
    <div className={styled.container}>
      <div className="">rasa</div>
    </div>
  );
}
