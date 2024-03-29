import {
  paginationValueChanged,
  productsInputValueChanged,
  useAppDispatch,
} from 'shared/api/redux';
import styled from './style.module.scss';
import { SVG } from 'shared/ui';
import { HeaderInputToggle } from 'entities/header';
import { useState } from 'react';
import { useLockPageScroll } from 'shared/hooks';
import { useDebouncedCallback } from 'use-debounce';

export function HeaderInput() {
  const dispatch = useAppDispatch();
  const [showInputBoolean, setShowInputBoolean] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleInput = () => {
    setShowInputBoolean(!showInputBoolean);
  };

  useLockPageScroll(showInputBoolean);

  const debouncedValue = useDebouncedCallback(() => {
    dispatch(productsInputValueChanged(inputValue));
  }, 1000);

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
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              debouncedValue();
              dispatch(paginationValueChanged(1));
            }}
          />
          <HeaderInputToggle type="cancel" onClick={toggleInput} />
        </div>
      </div>
    </>
  );
}
