import styled from './style.module.scss';
import { SidebarRadioboxProps } from './types';

export function SidebarRadiobox(props: SidebarRadioboxProps) {
  const { onChange, title, id, defaultChecked } = props;
  return (
    <>
      <input
        id={id}
        name="brandRadio"
        defaultChecked={defaultChecked}
        className={styled.checkbox}
        type="radio"
        onChange={onChange}
      />
      <label htmlFor={id}>{title}</label>
    </>
  );
}
