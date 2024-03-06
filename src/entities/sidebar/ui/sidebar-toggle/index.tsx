import { SVG } from 'shared/ui';
import styled from './style.module.scss';
import {
  useAppDispatch,
  isOpenedOnMobileChanged,
  useAppSelector,
} from 'shared/api/redux';
import { useLockPageScroll } from 'shared/hooks';

export function SidebarToggle() {
  const dispatch = useAppDispatch();

  const { isOpenedOnMobile } = useAppSelector((state) => state.sidebar);

  useLockPageScroll(isOpenedOnMobile);

  return (
    <button
      className={styled.button}
      type="button"
      onClick={() => dispatch(isOpenedOnMobileChanged())}
    >
      <SVG href="#arrow" svgClassName={styled.svg} useClassName={styled.use} />
      <h4 className={styled.heading}>Фильтры</h4>
    </button>
  );
}
