import styled from './style.module.scss';
import { SidebarBrand, SidebarPrice, SidebarHeader } from 'entities/sidebar';
import { useAppSelector } from 'shared/api/redux';

export function Sidebar() {
  const { isOpenedOnMobile } = useAppSelector((state) => state.sidebar);

  return (
    <div
      className={`${styled.wrapper} ${
        isOpenedOnMobile ? styled.openedOnMobile : ''
      }`}
    >
      <SidebarHeader />

      <SidebarPrice />
      <SidebarBrand />
    </div>
  );
}
