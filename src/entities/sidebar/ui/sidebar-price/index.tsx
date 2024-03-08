import styled from './style.module.scss';
import {
  useGetPrices,
  useConvertStringToNumber,
  useAscendingNumberSort,
} from 'shared/hooks';
import { SidebarPriceInput } from '../sidebar-price-input';
import _ from 'lodash';
import { SidebarContainer } from '../sidebar-container';

export function SidebarPrice() {
  const { data } = useGetPrices({});

  const uniqData = _.uniq(data);

  const convertedData = useConvertStringToNumber(uniqData);

  const sortedPrices = useAscendingNumberSort(convertedData);

  const priceRange = {
    min: sortedPrices[0],
    max: sortedPrices.slice(-1)[0],
  };

  return (
    <>
      <SidebarContainer
        title={{
          text: 'Цена',
        }}
      >
        <div className={`${styled.container}`}>
          <SidebarPriceInput type="min" minmax={priceRange} />
          <SidebarPriceInput type="max" minmax={priceRange} />
        </div>
      </SidebarContainer>
    </>
  );
}
