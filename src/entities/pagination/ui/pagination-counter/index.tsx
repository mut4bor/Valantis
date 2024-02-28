import { useAppSelector } from 'shared/redux/hooks';
import styled from './style.module.scss';

export function PaginationCounter() {
  const paginationValue = useAppSelector((state) => state.pagination.value);
  return (
    <>
      <div className={styled.counter}>{paginationValue}</div>
    </>
  );
}
