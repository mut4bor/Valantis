import styled from './style.module.scss';
import { SidebarPriceProps } from './types';
import {
  useGetFields,
  useConvertStringToNumber,
  useAscendingNumberSort,
} from 'shared/hooks';
import { SidebarPriceInput } from '../sidebar-price-input';
import _ from 'lodash';

export function SidebarPrice(props: SidebarPriceProps) {
  const { active } = props;

  const { data, isFetching } = useGetFields({ field: 'price' });

  const uniqData = _.uniq(data);

  const convertedData = useConvertStringToNumber(uniqData);

  const sortedPrices = useAscendingNumberSort(convertedData);

  const priceRange = {
    min: sortedPrices[0],
    max: sortedPrices.slice(-1)[0],
  };

  return (
    <>
      {active && (
        <div className={styled.container}>
          <SidebarPriceInput type="min" minmax={priceRange} />
          <SidebarPriceInput type="max" minmax={priceRange} />
        </div>
      )}
    </>
  );
}
