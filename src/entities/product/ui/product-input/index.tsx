import {
  productsInputValueChanged,
  useAppDispatch,
  useAppSelector,
} from 'shared/api/redux';
import styled from './style.module.scss';
import { SVG } from 'shared/ui';

export function ProductInput() {
  const dispatch = useAppDispatch();
  const { productsInput } = useAppSelector((state) => state.products);
  const { value } = productsInput;

  return (
    <>
      <div className={styled.inputWrapper}>
        <SVG
          href="#search"
          svgClassName={styled.searchSvg}
          useClassName={styled.searchUse}
        />
        <input
          title="Поиск"
          placeholder="Поиск"
          className={styled.input}
          type="text"
          value={value}
          onChange={(event) => {
            dispatch(productsInputValueChanged(event.target.value));
          }}
        />
      </div>
    </>
  );
}
