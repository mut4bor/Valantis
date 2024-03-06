import styled from './style.module.scss';
import { SidebarToggle } from '../sidebar-toggle';

export function SidebarHeader() {
  return (
    <div className={styled.container}>
      <SidebarToggle />
      <button className={styled.reset} type="button">
        Сбросить все
      </button>
    </div>
  );
}
