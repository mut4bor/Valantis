import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';
import { priceRangeChanged } from 'shared/api/redux/slices/sidebarSlice';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const dispatch = useAppDispatch();
  const { minmax, type } = props;
  const { min, max } = minmax;
  const { priceRange } = useAppSelector((state) => state.sidebar);
  const { min: priceRangeMin, max: priceRangeMax } = priceRange;

  const useGetInputValue = () => {
    const value = (value: number | string) => {
      return value !== 0 ? value : '';
    };
    return type === 'min' ? value(priceRangeMin) : value(priceRangeMax);
  };

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
      value={useGetInputValue()}
      onChange={useHandleDispatchPrice}
      placeholder={useGetPlaceholder()}
    />
  );
}
