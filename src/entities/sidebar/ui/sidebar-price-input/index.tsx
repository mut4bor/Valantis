import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';
import { priceRangeChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useEffect } from 'react';
import _ from 'lodash';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const dispatch = useAppDispatch();
  const { minmax, type } = props;
  const { min, max } = minmax;
  const { priceRange } = useAppSelector((state) => state.sidebar);
  const { priceMin, priceMax, priceIsEmpty } = priceRange;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    type === 'min'
      ? dispatch(
          priceRangeChanged({
            ...priceRange,
            priceMin: event.target.value,
          })
        )
      : dispatch(
          priceRangeChanged({
            ...priceRange,
            priceMax: event.target.value,
          })
        );
  };

  const useGetPlaceholder = () => {
    return `${type === 'min' ? `От ${min}` : `До ${max}`} ₽`;
  };

  useEffect(() => {
    dispatch(
      priceRangeChanged({
        ...priceRange,
        priceIsEmpty: priceMin === '' && priceMax === '',
      })
    );
  }, [priceMin, priceMax, dispatch]);

  return (
    <input
      type="number"
      min={min}
      max={max}
      className={styled.input}
      value={undefined}
      onChange={handleChange}
      placeholder={useGetPlaceholder()}
    />
  );
}
