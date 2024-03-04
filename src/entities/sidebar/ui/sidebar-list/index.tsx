import { SidebarBrand, SidebarContainer, SidebarPrice } from 'entities/sidebar';
import { useState } from 'react';

export function SidebarList() {
  const [itemActive, setItemActive] = useState({
    brand: false,
    price: false,
  });

  return (
    <>
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
    </>
  );
}
