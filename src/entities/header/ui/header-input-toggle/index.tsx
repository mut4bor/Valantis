import styled from './style.module.scss';
import { SVG } from 'shared/ui';
import { HeaderInputToggleProps } from './types';

export function HeaderInputToggle(props: HeaderInputToggleProps) {
  const { onClick, type } = props;
  return (
    <button
      title={type === 'search' ? 'Поиск' : 'Закрыть'}
      className={styled.button}
      type="button"
      onClick={onClick}
    >
      {type === 'search' ? (
        <SVG
          href="#search"
          svgClassName={styled.mobileSearchSvg}
          useClassName={styled.mobileSearchUse}
        />
      ) : (
        <p className={styled.cancel}>Закрыть</p>
      )}
    </button>
  );
}
