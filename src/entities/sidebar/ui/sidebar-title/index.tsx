import styled from './style.module.scss';
import { SidebarContainerProps } from './types';
import { SVG } from 'shared/ui';

export function SidebarTitle(props: SidebarContainerProps) {
  const { title, onClick, active } = props;

  return (
    <>
      <button type="button" className={styled.title} onClick={onClick}>
        <SVG
          href="#arrow"
          svgClassName={`${active ? styled.active : ''} ${styled.svg}`}
          useClassName={styled.use}
        />
        {title}
      </button>
    </>
  );
}
