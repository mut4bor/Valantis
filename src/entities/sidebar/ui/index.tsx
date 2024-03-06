import styled from './style.module.scss';
import {
  SidebarBrand,
  SidebarContainer,
  SidebarPrice,
  SidebarHeader,
} from 'entities/sidebar';
import { useState } from 'react';
import { useAppSelector } from 'shared/api/redux';

export function Sidebar() {
  const [itemActive, setItemActive] = useState({
    brand: false,
    price: false,
  });

  const { isOpenedOnMobile } = useAppSelector((state) => state.sidebar);

  return (
    <div
      className={`${styled.wrapper} ${
        isOpenedOnMobile ? styled.openedOnMobile : ''
      }`}
    >
      <SidebarHeader />

      <SidebarContainer
        title={{
          text: 'Цена',
          onClick: () => {
            setItemActive({ ...itemActive, price: !itemActive.price });
          },
          active: itemActive.price,
        }}
      >
        <SidebarPrice active={itemActive.price} />
      </SidebarContainer>

      <SidebarContainer
        title={{
          text: 'Производитель',
          onClick: () => {
            setItemActive({ ...itemActive, brand: !itemActive.brand });
          },
          active: itemActive.brand,
        }}
      >
        <SidebarBrand active={itemActive.brand} />
      </SidebarContainer>
    </div>
  );
}
