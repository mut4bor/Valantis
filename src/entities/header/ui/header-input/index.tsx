import {
  productsInputValueChanged,
  useAppDispatch,
  useAppSelector,
} from 'shared/api/redux';
import styled from './style.module.scss';
import { SVG } from 'shared/ui';
import { HeaderInputToggle } from 'entities/header';
import { useState } from 'react';
import { useLockPageScroll } from 'shared/hooks';

export function HeaderInput() {
  const dispatch = useAppDispatch();
  const { productsInput } = useAppSelector((state) => state.products);
  const { value } = productsInput;
  const [showInputBoolean, setShowInputBoolean] = useState(false);

  const toggleInput = () => {
    setShowInputBoolean(!showInputBoolean);
  };

  useLockPageScroll(showInputBoolean);

  return (
    <>
      <HeaderInputToggle type="search" onClick={toggleInput} />

      <div
        className={`${styled.container} ${
          showInputBoolean ? styled.mobileVisible : ''
        }`}
      >
        <div className={styled.inputWrapper}>
          <SVG
            href="#search"
            svgClassName={styled.searchSvg}
            useClassName={styled.searchUse}
          />
          <input
            title="Поиск"
            placeholder="Поиск"
            className={styled.input}
            type="text"
            value={value}
            onChange={(event) => {
              dispatch(productsInputValueChanged(event.target.value));
            }}
          />
          <HeaderInputToggle type="cancel" onClick={toggleInput} />
        </div>
      </div>
    </>
  );
}
