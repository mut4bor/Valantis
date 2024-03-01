import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { increment, decrement } from 'shared/redux/slices/PaginationSlice';
import SVG from 'shared/SVG';
import styled from './style.module.scss';
import { useIdsLogic } from 'shared/useIdsLogic';
import { useEffect } from 'react';

type PaginationButtonProps = {
  buttonType: 'increment' | 'decrement';
};

export function PaginationButton(props: PaginationButtonProps) {
  const dispatch = useAppDispatch();
  useIdsLogic();

  const { buttonType } = props;
  const paginationValue = useAppSelector((state) => state.pagination.value);
  const paginationMinValue = useAppSelector(
    (state) => state.pagination.minValue
  );
  const paginationMaxValue = useAppSelector(
    (state) => state.pagination.maxValue
  );
  const productQueries = useAppSelector((state) => state.productApi.queries);
  const dataStatus = Object.values(productQueries).slice(-1)[0]?.status;

  return (
    <button
      type="button"
      title={buttonType}
      disabled={
        (buttonType === 'increment' &&
          paginationValue === paginationMaxValue) ||
        (buttonType === 'decrement' && paginationValue === paginationMinValue)
      }
      className={styled.button}
      onClick={() => {
        dataStatus === 'fulfilled' &&
          (buttonType === 'increment'
            ? dispatch(increment())
            : dispatch(decrement()));
      }}
    >
      <SVG
        href="#arrow"
        svgClassName={`${styled.svg} ${
          buttonType === 'decrement' ? styled.inverted : ''
        }`}
        useClassName={styled.use}
      />
    </button>
  );
}
