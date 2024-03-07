import { SidebarContainerProps } from './types';
import { SidebarTitle } from '../sidebar-title';
import styled from './style.module.scss';
import { useState } from 'react';

export function SidebarContainer(props: SidebarContainerProps) {
  const { children, title } = props;
  const { text } = title;

  const [active, setActive] = useState(false);

  return (
    <div className={`${styled.container} ${active ? styled.active : ''}`}>
      <SidebarTitle
        title={text}
        active={active}
        onClick={() => {
          setActive(!active);
        }}
      />
      <div className={styled.children}>{children}</div>
    </div>
  );
}
