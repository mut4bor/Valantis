import styled from './style.module.scss';
import { SVG } from 'shared/ui';
import { ProductSortRadio } from '../product-sort-radio';
import { useAppSelector } from 'shared/api/redux';

import { useState, useEffect, useRef } from 'react';

export function ProductSort() {
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

  const handleListClosing = () => {
    setActive(false);
  };

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
          {sortNameMapKeys.map((data, index) => {
            return (
              <ProductSortRadio
                key={index}
                onChange={handleListClosing}
                id={data}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
