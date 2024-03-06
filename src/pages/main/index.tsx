import styled from './style.module.scss';

import { Product } from 'entities/product';
import { Sidebar } from 'entities/sidebar';

export function MainPage() {
  return (
    <div className={styled.container}>
      <Sidebar />
      <Product />
    </div>
  );
}
