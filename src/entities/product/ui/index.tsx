import styled from './style.module.scss';
import { ProductList, ProductSort, ProductPagination } from 'entities/product';
import { SidebarToggle } from 'entities/sidebar';

export function Product() {
  return (
    <div className={styled.wrapper}>
      <div className={styled.header}>
        <SidebarToggle />
        <ProductPagination />
        <ProductSort />
      </div>
      <ProductList />
    </div>
  );
}
