import { useState } from 'react';
import styled from './style.module.scss';
import { SVG } from 'shared/ui';
import { ProductSortRadio } from '../product-sort-radio';

export function ProductSort() {
  const [active, setActive] = useState(false);
  return (
    <div className={styled.container}>
      <label htmlFor="sortButton" className={styled.label}>
        Сортировка:
      </label>
      <button
        type="button"
        id="sortButton"
        className={styled.button}
        onClick={() => setActive(!active)}
      >
        сначала недорогие
        <SVG
          href="#arrow"
          svgClassName={`${active ? styled.active : ''} ${styled.svg}`}
          useClassName={styled.use}
        />
      </button>
      {active && (
        <ul className={styled.list}>
          <ProductSortRadio
            onChange={() => setActive(false)}
            id="cheap"
            defaultChecked
            labelText="сначала недорогие"
          />
          <ProductSortRadio
            onChange={() => setActive(false)}
            id="expensive"
            labelText="сначала дорогие"
          />
          <ProductSortRadio
            onChange={() => setActive(false)}
            id="az"
            labelText="по названию (а-я)"
          />
          <ProductSortRadio
            onChange={() => setActive(false)}
            id="za"
            labelText="по названию (я-а)"
          />
        </ul>
      )}
    </div>
  );
}
