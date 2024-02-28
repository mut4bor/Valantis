import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { increment, decrement } from 'shared/redux/slices/PaginationSlice';
import SVG from 'shared/SVG';
import styled from './style.module.scss';

type PaginationButtonProps = {
  buttonType: 'increment' | 'decrement';
};

export function PaginationButton(props: PaginationButtonProps) {
  const { buttonType } = props;
  const paginationValue = useAppSelector((state) => state.pagination.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        type="button"
        title={buttonType}
        className={`${styled.button} ${
          buttonType === 'decrement' && paginationValue === 1
            ? styled.disabled
            : ''
        }`}
        onClick={() => {
          buttonType === 'increment'
            ? dispatch(increment())
            : dispatch(decrement());
        }}
      >
        <SVG
          href="#arrow"
          svgClassName={`${styled.svg} ${
            buttonType === 'decrement' ? styled.inverted : ''
          }`}
          useClassName={`${styled.use} ${
            buttonType === 'decrement' && paginationValue === 1
              ? styled.disabled
              : ''
          }`}
        />
      </button>
    </>
  );
}
