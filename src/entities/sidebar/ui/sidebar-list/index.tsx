import styled from './style.module.scss';
import {
  SidebarBrand,
  SidebarTitle,
  SidebarContainer,
  SidebarPrice,
} from 'entities/sidebar';
import { useState } from 'react';

export function SidebarList() {
  const [itemActive, setItemActive] = useState({
    brand: false,
    price: false,
  });

  return (
    <>
      <SidebarContainer>
        <SidebarTitle
          title="Производитель"
          onClick={() =>
            setItemActive({ ...itemActive, brand: !itemActive.brand })
          }
          active={itemActive.brand}
        />
        <SidebarBrand active={itemActive.brand} />
      </SidebarContainer>
      <SidebarContainer>
        <SidebarTitle
          title="Цена"
          onClick={() =>
            setItemActive({ ...itemActive, price: !itemActive.price })
          }
          active={itemActive.price}
        />
        <SidebarPrice active={itemActive.price} />
      </SidebarContainer>
    </>
  );
}
