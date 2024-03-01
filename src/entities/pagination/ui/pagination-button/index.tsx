import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { increment, decrement } from 'shared/redux/slices/PaginationSlice';
import SVG from 'shared/SVG';
import styled from './style.module.scss';
import { useGetIdsQuery } from 'shared/redux/slices/APISlice';
import { maxValueChanged } from 'shared/redux/slices/PaginationSlice';
import { useEffect } from 'react';
import _ from 'lodash';

type PaginationButtonProps = {
  buttonType: 'increment' | 'decrement';
};

export function PaginationButton(props: PaginationButtonProps) {
  const dispatch = useAppDispatch();
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

  const {
    data: allIdsData,
    error: allIdsError,
    isLoading: allIdsIsLoading,
    refetch: allIdsRefetch,
  } = useGetIdsQuery();

  const filteredAllIdsData = _.uniq(allIdsData?.result);

  useEffect(() => {
    dispatch(maxValueChanged(Math.ceil(filteredAllIdsData.length / 50)));
  }, [filteredAllIdsData, dispatch]);

  return (
    <>
      <button
        type="button"
        title={buttonType}
        disabled={
          (buttonType === 'decrement' && paginationValue === paginationMinValue
            ? true
            : false) ||
          (buttonType === 'increment' && paginationValue === paginationMaxValue
            ? true
            : false)
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
    </>
  );
}
