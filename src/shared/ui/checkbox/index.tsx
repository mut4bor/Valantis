import styled from './style.module.scss';
import { CheckboxProps } from './types';

export function Checkbox(props: CheckboxProps) {
  const { label, checked } = props;
  return (
    <>
      <input
        id={label}
        className={styled.checkbox}
        checked={checked}
        type="checkbox"
      />
      <label htmlFor={label}>{label}</label>
    </>
  );
}
