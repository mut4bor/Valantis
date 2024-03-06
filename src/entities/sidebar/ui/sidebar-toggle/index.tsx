import { SVG } from 'shared/ui';
import styled from './style.module.scss';
import { useAppDispatch } from 'shared/api/redux';
import { isOpenedOnMobileChanged } from 'shared/api/redux';

export function SidebarToggle() {
  const dispatch = useAppDispatch();

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
