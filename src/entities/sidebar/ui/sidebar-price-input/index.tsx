import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';
import { priceRangeChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { paginationValueChanged } from 'shared/api/redux';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const dispatch = useAppDispatch();
  const { minmax, type } = props;
  const { min, max } = minmax;
  const { priceRange } = useAppSelector((state) => state.sidebar);

  const [value, setValue] = useState('');

  const priceMin = value === '' ? 0 : parseFloat(value);
  const priceMax = value === '' ? Infinity : parseFloat(value);

  const debouncedPrice = useDebouncedCallback(
    () =>
      dispatch(
        priceRangeChanged(
          type === 'min'
            ? { ...priceRange, priceMin: priceMin }
            : { ...priceRange, priceMax: priceMax }
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
    return `${type === 'min' ? `От ${min}` : `До ${max}`} ₽`;
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      className={styled.input}
      value={value}
      onChange={handleChange}
      placeholder={useGetPlaceholder()}
    />
  );
}
