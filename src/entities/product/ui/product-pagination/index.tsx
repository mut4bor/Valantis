import {
  PaginationContainer,
  PaginationButton,
  PaginationCounter,
} from 'shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  increment,
  decrement,
} from 'shared/api/redux';

export function ProductPagination() {
  const dispatch = useAppDispatch();

  const {
    value: paginationValue,
    minValue: paginationMinValue,
    maxValue: paginationMaxValue,
    paginationDisabled,
  } = useAppSelector((state) => state.pagination);
  return (
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
  );
}
