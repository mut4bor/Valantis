import styled from './style.module.scss';
import favicon from 'shared/icons/favicon.png';

export function Header() {
  return (
    <header className={styled.header}>
      <div className={styled.container}>
        <div className={styled.titleWrapper}>
          <img src={favicon} className={styled.titleImg} alt="" />
          <h1 className={styled.title}>Valantis Jewelry</h1>
        </div>
      </div>
    </header>
  );
}
