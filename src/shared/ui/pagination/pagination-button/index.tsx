import { SVG } from 'shared/ui';
import styled from './style.module.scss';
import { PaginationButtonProps } from './types';

export function PaginationButton(props: PaginationButtonProps) {
  const { buttonType, disabled, onClick } = props;

  return (
    <button
      type="button"
      title={buttonType}
      disabled={disabled}
      className={styled.button}
      onClick={onClick}
    >
      <SVG
        href="#arrow"
        svgClassName={`${styled.svg} ${
          buttonType === 'decrement' ? styled.inverted : ''
        }`}
        useClassName={styled.use}
      />
    </button>
  );
}
