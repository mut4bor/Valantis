import { Pagination } from 'shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  paginationValueChanged,
} from 'shared/api/redux';

export function ProductPagination() {
  const dispatch = useAppDispatch();

  const {
    paginationValue,
    paginationMinValue,
    paginationMaxValue,
    paginationDisabled,
  } = useAppSelector((state) => state.pagination);

  return (
    <Pagination
      counterValue={paginationValue}
      incrementButton={{
        incrementIsDisabled:
          paginationValue === paginationMaxValue || paginationDisabled,
        incrementOnClick: () =>
          !paginationDisabled &&
          dispatch(paginationValueChanged(paginationValue + 1)),
      }}
      decrementButton={{
        decrementIsDisabled: paginationValue === paginationMinValue,
        decrementOnClick: () =>
          dispatch(paginationValueChanged(paginationValue - 1)),
      }}
    />
  );
}
