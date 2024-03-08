import styled from './style.module.scss';
import { SidebarToggle } from '../sidebar-toggle';
import {
  filtersChanged,
  priceInputValueChanged,
  productsInputValueChanged,
  useAppDispatch,
} from 'shared/api/redux';

export function SidebarHeader() {
  const dispatch = useAppDispatch();

  return (
    <div className={styled.container}>
      <SidebarToggle />
      <button
        className={styled.reset}
        type="button"
        onClick={() => {
          dispatch(productsInputValueChanged(''));
          dispatch(
            priceInputValueChanged({
              priceInputMin: 0,
              priceInputMax: Infinity,
            })
          );
          dispatch(filtersChanged({ brand: undefined }));
        }}
      >
        Сбросить все
      </button>
    </div>
  );
}
