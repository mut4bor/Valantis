import styled from './style.module.scss';
import { PaginationCounterProps } from './types';

export function PaginationCounter(props: PaginationCounterProps) {
  const { value } = props;
  return <div className={styled.counter}>{value}</div>;
}
