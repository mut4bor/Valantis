import { SidebarContainerProps } from './types';
import { SidebarTitle } from '../sidebar-title';

export function SidebarContainer(props: SidebarContainerProps) {
  const { children, title } = props;
  const { text, onClick, active } = title;
  return (
    <div>
      <SidebarTitle title={text} onClick={onClick} active={active} />
      {children}
    </div>
  );
}
