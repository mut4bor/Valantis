import { ProductSortRadioProps } from './types';
import styled from './style.module.scss';

export function ProductSortRadio(props: ProductSortRadioProps) {
  const { labelText, id, defaultChecked, onChange } = props;
  return (
    <li>
      <input
        className={styled.checkbox}
        onChange={onChange}
        defaultChecked={defaultChecked}
        id={id}
        name="sortChoose"
        type="radio"
      />
      <label className={styled.label} htmlFor={id}>
        {labelText}
      </label>
    </li>
  );
}
