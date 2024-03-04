import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';
import { priceRangeChanged } from 'shared/api/redux/slices/sidebarSlice';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const dispatch = useAppDispatch();
  const { minmax, type } = props;
  const { min, max } = minmax;
  const { priceRange } = useAppSelector((state) => state.sidebar);

  const useHandleDispatchPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    type === 'min'
      ? dispatch(
          priceRangeChanged({
            ...priceRange,
            min: event.target.value,
          })
        )
      : dispatch(
          priceRangeChanged({
            ...priceRange,
            max: event.target.value,
          })
        );
  };

  const useGetPlaceholder = () => {
    return `${type === 'min' ? `От ${min}` : `До ${max}`} ₽`;
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      className={styled.input}
      value={undefined}
      onChange={useHandleDispatchPrice}
      placeholder={useGetPlaceholder()}
    />
  );
}
