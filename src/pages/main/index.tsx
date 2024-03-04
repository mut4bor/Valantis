import styled from './style.module.scss';
import {
  PaginationContainer,
  PaginationButton,
  PaginationCounter,
} from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { ProductList, ProductInput, ProductSort } from 'entities/product';

import { increment, decrement } from 'shared/api/redux/slices/paginationSlice';
import { SidebarList } from 'entities/sidebar';

export function MainPage() {
  const dispatch = useAppDispatch();

  const {
    value: paginationValue,
    minValue: paginationMinValue,
    maxValue: paginationMaxValue,
    paginationDisabled,
  } = useAppSelector((state) => state.pagination);

  return (
    <div className={styled.container}>
      <div className={styled.sidebarWrapper}>
        <SidebarList />
      </div>
      <div className={styled.mainWrapper}>
        <div className={styled.mainHeader}>
          <PaginationContainer>
            <PaginationButton
              buttonType="decrement"
              disabled={paginationValue === paginationMinValue}
              onClick={() => dispatch(decrement())}
            />
            <PaginationCounter />
            <PaginationButton
              buttonType="increment"
              disabled={paginationValue === paginationMaxValue}
              onClick={() => !paginationDisabled && dispatch(increment())}
            />
          </PaginationContainer>
          <ProductInput />
          <ProductSort />
        </div>
        <ProductList />
      </div>
    </div>
  );
}
