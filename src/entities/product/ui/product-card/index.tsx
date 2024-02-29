import styled from './style.module.scss';
import { ProductCardProps } from './types';

export function ProductCard(props: ProductCardProps) {
  const { data } = props;
  const { id, name, price, brand } = data;
  return (
    <>
      <h4 className={styled.id}>ID: {id}</h4>
      <h4 className={styled.name}>Product: {name}</h4>
      <h4 className={styled.price}>Price: {price}</h4>
      <h4 className={styled.brand}>Brand: {brand ? brand : '#'}</h4>
    </>
  );
}
