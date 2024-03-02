import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { increment, decrement } from 'shared/redux/slices/PaginationSlice';
import SVG from 'shared/SVG';
import styled from './style.module.scss';
import { useIdsLogic } from 'shared/useIdsLogic';

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
  const paginationIsDisabledChanged = useAppSelector(
    (state) => state.pagination.isDisabled
  );

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
        buttonType === 'increment'
          ? !paginationIsDisabledChanged && dispatch(increment())
          : dispatch(decrement());
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
