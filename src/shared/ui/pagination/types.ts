export type PaginationProps = {
  counterValue: string | number;
  incrementButton: {
    incrementIsDisabled?: boolean;
    incrementOnClick: () => void;
  };
  decrementButton: {
    decrementIsDisabled?: boolean;
    decrementOnClick: () => void;
  };
};
