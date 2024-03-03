import styled from './style.module.scss';
import { SidebarContainerProps } from './types';

export function SidebarContainer(props: SidebarContainerProps) {
  const { children } = props;
  return <div className={styled.container}>{children}</div>;
}
