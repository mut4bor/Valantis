import styled from './style.module.scss';
import { SidebarPriceProps } from './types';
import { Checkbox } from 'shared/ui';
import { useGetAllPrices } from 'shared/hooks/useGetAllPrices';
import _ from 'lodash';
import { SidebarPriceInput } from '../sidebar-price-input';

export function SidebarPrice(props: SidebarPriceProps) {
  const { active } = props;

  const data = useGetAllPrices();

  const filteredFields = _.uniq(data);

  const sortedPrices = filteredFields.sort();
  const minPrice = sortedPrices[0];
  const maxPrice = sortedPrices.at(-1);

  return (
    <>
      {active && (
        <div className={styled.container}>
          <div className={styled.inputWrapper}>
            <SidebarPriceInput
              min={minPrice}
              max={maxPrice}
              placeholder={`От ${minPrice} ₽`}
            />
            <SidebarPriceInput
              min={minPrice}
              max={maxPrice}
              placeholder={`До ${maxPrice} ₽`}
            />
          </div>
        </div>
      )}
    </>
  );
}
