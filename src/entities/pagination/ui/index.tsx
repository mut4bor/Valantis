import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { increment, decrement } from 'shared/redux/slices/PaginationSlice';

type PaginationButtonProps = {
  buttonType: 'increment' | 'decrement';
};

export function PaginationButton(props: PaginationButtonProps) {
  const { buttonType } = props;
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        onClick={() => {
          buttonType === 'increment'
            ? dispatch(increment())
            : dispatch(decrement());
        }}
      >
        {buttonType === 'increment' ? '>' : '<'}
      </button>
    </>
  );
}
