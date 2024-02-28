import styled from './style.module.scss';

type PaginationButtonProps = {
  children: React.ReactNode;
};

export function PaginationContainer(props: PaginationButtonProps) {
  const { children } = props;
  return (
    <>
      <div className={styled.container}>{children}</div>
    </>
  );
}
