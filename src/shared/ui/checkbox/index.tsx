import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';
import styled from './style.module.scss';
import { CheckboxProps } from './types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';

export function Checkbox(props: CheckboxProps) {
  const { data } = props;
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <input
        id={data}
        className={styled.checkbox}
        checked={checked}
        type="checkbox"
        onChange={() => {
          setChecked(!checked);
          dispatch(filtersChanged({ brand: !checked ? data : '' }));
        }}
      />
      <label htmlFor={data}>{data === null ? '#' : data}</label>
    </>
  );
}
