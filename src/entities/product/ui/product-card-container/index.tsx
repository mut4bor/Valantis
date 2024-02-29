import styled from './style.module.scss';
import { ProductCardContainerProps } from './types';

export function ProductCardContainer(props: ProductCardContainerProps) {
  const { children } = props;
  return (
    <>
      <div className={styled.container}>{children}</div>
    </>
  );
}
