import styled from './style.module.scss';
import { RadioboxProps } from './types';

export function Radiobox(props: RadioboxProps) {
  const { onChange, title, id, defaultChecked, name, checked } = props;
  return (
    <>
      <input
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        className={styled.checkbox}
        type="radio"
        onChange={onChange}
      />
      <label htmlFor={id}>{title}</label>
    </>
  );
}
