import styled from './style.module.scss';

type PaginationContainerProps = {
  children: React.ReactNode;
};

export function PaginationContainer(props: PaginationContainerProps) {
  const { children } = props;
  return <div className={styled.container}>{children}</div>;
}
