import styled from './style.module.scss';
import { ProductCardProps } from './types';
import { Skeleton } from '@mui/material';

export function ProductCard(props: ProductCardProps) {
  const { data } = props;
  if (!data) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation="wave"
            sx={{ fontSize: '1.4rem' }}
          />
        ))}
      </>
    );
  }
  const { id, name, price, brand } = data;

  return (
    <>
      <p className={styled.id}>ID: {id}</p>
      <p className={styled.name}>Product: {name}</p>
      <p className={styled.price}>Price: {price} ₽</p>
      <p className={styled.brand}>Brand: {brand ? brand : '#'}</p>
    </>
  );
}
