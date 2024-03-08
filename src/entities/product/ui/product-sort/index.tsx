import styled from './style.module.scss';
import { SVG, Radiobox } from 'shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  setSelectedOption,
} from 'shared/api/redux';

import { useState, useEffect, useRef } from 'react';

export function ProductSort() {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const { selectedSort, sortNameMap } = useAppSelector(
    (state) => state.products.productsSort
  );

  const sortNameMapKeys = Object.keys(sortNameMap);

  return (
    <div ref={ref} className={styled.container}>
      <label htmlFor="sortButton" className={styled.label}>
        Сортировка:
      </label>
      <button
        type="button"
        id="sortButton"
        className={styled.button}
        onClick={() => setActive(!active)}
      >
        {sortNameMap[selectedSort]}
        <SVG
          href="#arrow"
          svgClassName={`${active ? styled.active : ''} ${styled.svg}`}
          useClassName={styled.use}
        />
      </button>
      {active && (
        <ul className={styled.list}>
          {sortNameMapKeys.map((sortname, index) => {
            return (
              <Radiobox
                key={sortname + index}
                id={sortname}
                title={sortNameMap[sortname]}
                name="productSortRadio"
                checked={selectedSort === sortname}
                onChange={() => {
                  setActive(false);
                  dispatch(setSelectedOption(sortname));
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
