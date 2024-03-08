import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { useGetFields, useAlphabeticalSort } from 'shared/hooks';
import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useAppDispatch } from 'shared/api/redux/hooks';
import _ from 'lodash';
import { SidebarContainer } from '../sidebar-container';
import { Radiobox } from 'shared/ui';
import { paginationValueChanged } from 'shared/api/redux';

export function SidebarBrand(props: SidebarBrandProps) {
  const dispatch = useAppDispatch();
  const { active } = props;

  const { data: brandData, isFetching: brandIsFetching } = useGetFields({
    field: 'brand',
  });

  const uniqData = _.uniq(brandData);

  const brands = useAlphabeticalSort(uniqData);

  return (
    <SidebarContainer
      title={{
        text: 'Производитель',
      }}
    >
      <div
        className={`${styled.container} ${
          active && !brandIsFetching ? styled.visible : ''
        }`}
      >
        <>
          <Radiobox
            defaultChecked
            id="allBrands"
            title="Все производители"
            name="brandRadio"
            onChange={() => {
              dispatch(filtersChanged({ brand: undefined }));
              dispatch(paginationValueChanged(1));
            }}
          />
          {brands.map((brand, index) => {
            const isDataNotNull = () => {
              return brand === null ? '#' : brand;
            };
            return (
              <Radiobox
                key={isDataNotNull() + index}
                id={isDataNotNull()}
                title={isDataNotNull()}
                name="brandRadio"
                onChange={() => {
                  dispatch(filtersChanged({ brand: brand }));
                  dispatch(paginationValueChanged(1));
                }}
              />
            );
          })}
        </>
      </div>
    </SidebarContainer>
  );
}
