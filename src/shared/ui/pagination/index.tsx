import { PaginationContainer } from './pagination-container';
import { PaginationButton } from './pagination-button';
import { PaginationCounter } from './pagination-counter';
import { PaginationProps } from './types';

export function Pagination(props: PaginationProps) {
  const {
    counterValue,
    incrementButton: { incrementIsDisabled, incrementOnClick },
    decrementButton: { decrementIsDisabled, decrementOnClick },
  } = props;

  return (
    <PaginationContainer>
      <PaginationButton
        buttonType="decrement"
        disabled={decrementIsDisabled}
        onClick={decrementOnClick}
      />
      <PaginationCounter value={counterValue} />
      <PaginationButton
        buttonType="increment"
        disabled={incrementIsDisabled}
        onClick={incrementOnClick}
      />
    </PaginationContainer>
  );
}
