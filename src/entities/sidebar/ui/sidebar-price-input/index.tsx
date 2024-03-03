import { useState } from 'react';
import styled from './style.module.scss';
import { SidebarPriceInputProps } from './types';

export function SidebarPriceInput(props: SidebarPriceInputProps) {
  const { placeholder, min, max } = props;
  const [value, setValue] = useState(null);
  return (
    <input
      min={min}
      max={max}
      className={styled.input}
      type="number"
      placeholder={placeholder}
    />
  );
}
