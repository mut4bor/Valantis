import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { useGetFields, useAlphabeticalSort } from 'shared/hooks';
import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useAppDispatch } from 'shared/api/redux/hooks';
import { SidebarRadiobox } from '../sidebar-brand-radio';
import _ from 'lodash';
import { SidebarContainer } from '../sidebar-container';

export function SidebarBrand(props: SidebarBrandProps) {
  const dispatch = useAppDispatch();
  const { active } = props;

  const { data: brandData, isFetching: brandIsFetching } = useGetFields({
    field: 'brand',
  });

  const uniqData = _.uniq(brandData);

  const brands = useAlphabeticalSort(uniqData);

  return (
    <>
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
            <SidebarRadiobox
              id="allBrands"
              title="Все производители"
              defaultChecked
              onChange={() => {
                dispatch(filtersChanged({ brand: undefined }));
              }}
            />
            {brands.map((brand, index) => {
              const isDataNotNull = () => {
                return brand === null ? '#' : brand;
              };
              return (
                <SidebarRadiobox
                  key={index}
                  id={isDataNotNull()}
                  title={isDataNotNull()}
                  onChange={() => {
                    dispatch(filtersChanged({ brand: brand }));
                  }}
                />
              );
            })}
          </>
        </div>
      </SidebarContainer>
    </>
  );
}
