import styled from './style.module.scss';
import {
  PaginationContainer,
  PaginationButton,
  PaginationCounter,
} from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { ProductList } from 'entities/product';

import { useIdsLogic } from 'shared/hooks';
import { increment, decrement } from 'shared/api/redux/slices/PaginationSlice';
import { SidebarList } from 'entities/sidebar';

export function MainPage() {
  const dispatch = useAppDispatch();
  useIdsLogic();

  const {
    value: paginationValue,
    minValue: paginationMinValue,
    maxValue: paginationMaxValue,
    isDisabled: paginationIsDisabled,
  } = useAppSelector((state) => state.pagination);

  return (
    <div className={styled.container}>
      <div className={styled.sidebarWrapper}>
        <SidebarList />
      </div>
      <div className={styled.mainWrapper}>
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
            onClick={() => !paginationIsDisabled && dispatch(increment())}
          />
        </PaginationContainer>

        <ProductList />
      </div>
    </div>
  );
}
