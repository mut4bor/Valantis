import { ProductSortRadioProps } from './types';
import styled from './style.module.scss';
import {
  useAppDispatch,
  setSelectedOption,
  useAppSelector,
} from 'shared/api/redux';

export function ProductSortRadio(props: ProductSortRadioProps) {
  const { id, defaultChecked, onChange } = props;
  const dispatch = useAppDispatch();
  const handleOptionChange = (option: string) => {
    dispatch(setSelectedOption(option));
  };

  const { selectedSort, sortNameMap } = useAppSelector(
    (state) => state.products.productsSort
  );

  return (
    <li>
      <input
        className={styled.checkbox}
        checked={selectedSort === id}
        onChange={() => {
          handleOptionChange(id);
          onChange && onChange();
        }}
        defaultChecked={defaultChecked}
        id={id}
        name="priceSortChoose"
        type="radio"
      />
      <label className={styled.label} htmlFor={id}>
        {sortNameMap[id]}
      </label>
    </li>
  );
}
