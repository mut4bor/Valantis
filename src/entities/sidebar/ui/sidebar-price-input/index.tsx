import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';
import {
  useAppDispatch,
  useAppSelector,
  paginationValueChanged,
  priceInputValueChanged,
} from 'shared/api/redux';
import { useIdsSortedByPrice } from 'shared/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const dispatch = useAppDispatch();
  const { type } = props;
  const { priceInput } = useAppSelector((state) => state.sidebar);
  const { price } = useIdsSortedByPrice();

  const [value, setValue] = useState('');

  const priceInputMinValue = value === '' ? 0 : parseFloat(value);
  const priceInputMaxValue = value === '' ? Infinity : parseFloat(value);

  const debouncedPrice = useDebouncedCallback(
    () =>
      dispatch(
        priceInputValueChanged(
          type === 'min'
            ? { ...priceInput, priceMin: priceInputMinValue }
            : { ...priceInput, priceMax: priceInputMaxValue }
        )
      ),
    1000
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debouncedPrice();
    dispatch(paginationValueChanged(1));
  };

  const useGetPlaceholder = () => {
    return `${type === 'min' ? `От ${price?.min}` : `До ${price?.max}`} ₽`;
  };

  return (
    <input
      type="number"
      min={price?.min}
      max={price?.max}
      className={styled.input}
      value={value}
      onChange={handleChange}
      placeholder={useGetPlaceholder()}
    />
  );
}
