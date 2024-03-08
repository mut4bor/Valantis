import styled from './style.module.scss';
import { SidebarPriceInput } from '../sidebar-price-input';
import { SidebarContainer } from '../sidebar-container';

export function SidebarPrice() {
  return (
    <>
      <SidebarContainer
        title={{
          text: 'Цена',
        }}
      >
        <div className={`${styled.container}`}>
          <SidebarPriceInput type="min" />
          <SidebarPriceInput type="max" />
        </div>
      </SidebarContainer>
    </>
  );
}
