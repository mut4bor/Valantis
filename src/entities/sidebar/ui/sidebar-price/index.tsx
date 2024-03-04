import styled from './style.module.scss';
import { SidebarPriceProps } from './types';
import { useGetFields } from 'shared/hooks';
import { SidebarPriceInput } from '../sidebar-price-input';

export function SidebarPrice(props: SidebarPriceProps) {
  const { active } = props;

  const { data, isFetching } = useGetFields({ field: 'price' });

  const sortedPrices = data.sort();

  const minmax = {
    min: parseFloat(sortedPrices[0]),
    max: parseFloat(sortedPrices.slice(-1)[0]),
  };

  return (
    <>
      {active && (
        <div className={styled.container}>
          <SidebarPriceInput type="min" minmax={minmax} />
          <SidebarPriceInput type="max" minmax={minmax} />
        </div>
      )}
    </>
  );
}
