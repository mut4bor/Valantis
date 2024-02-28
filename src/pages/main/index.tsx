import styled from './style.module.scss';
import {
  PaginationContainer,
  PaginationButton,
  PaginationCounter,
} from 'entities/pagination';

import { ProductList } from 'entities/product';

export function MainPage() {
  return (
    <div className={styled.container}>
      <PaginationContainer>
        <PaginationButton buttonType="decrement" />
        <PaginationCounter />
        <PaginationButton buttonType="increment" />
      </PaginationContainer>
      <ProductList />
    </div>
  );
}
