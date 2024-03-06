import styled from './style.module.scss';
import favicon from 'shared/icons/favicon.png';
import { useState, useEffect } from 'react';
import { HeaderInput } from './header-input/index';

export function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header className={`${styled.header} ${!visible ? styled.hidden : ''}`}>
      <div className={styled.container}>
        <div className={styled.titleWrapper}>
          <img src={favicon} className={styled.titleImg} alt="" />
          <h1 className={styled.title}>Valantis Jewelry</h1>
        </div>

        <HeaderInput />
      </div>
    </header>
  );
}
