import styled from './style.module.scss';
import { PaginationContainerProps } from './types';

export function PaginationContainer(props: PaginationContainerProps) {
  const { children } = props;
  return <div className={styled.container}>{children}</div>;
}
