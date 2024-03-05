import styled from './style.module.scss';
import { SidebarContainerProps } from './types';
import { SidebarTitle } from '../sidebar-title';

export function SidebarContainer(props: SidebarContainerProps) {
  const { children, title } = props;
  const { text, onClick, active } = title;
  return (
    <div className={styled.container}>
      <SidebarTitle title={text} onClick={onClick} active={active} />
      {children}
    </div>
  );
}