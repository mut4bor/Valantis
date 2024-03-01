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
            sx={{ fontSize: '1rem' }}
          />
        ))}
      </>
    );
  }
  const { id, name, price, brand } = data;

  return (
    <>
      <h4 className={styled.id}>ID: {id}</h4>
      <h4 className={styled.name}>Product: {name}</h4>
      <h4 className={styled.price}>Price: {price} ₽</h4>
      <h4 className={styled.brand}>Brand: {brand ? brand : '#'}</h4>
    </>
  );
}
