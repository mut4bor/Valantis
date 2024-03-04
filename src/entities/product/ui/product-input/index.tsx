import styled from './style.module.scss';
import { SVG } from 'shared/ui';

export function ProductInput() {
  return (
    <>
      <div className={styled.inputWrapper}>
        <SVG
          href="#search"
          svgClassName={styled.searchSvg}
          useClassName={styled.searchUse}
        />
        <input
          title=""
          placeholder="Поиск"
          className={styled.input}
          type="text"
        />
      </div>
    </>
  );
}
