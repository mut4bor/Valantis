import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { useGetFields, useAlphabeticalSort } from 'shared/hooks';
import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { SidebarRadiobox } from '../sidebar-brand-radio';
import _ from 'lodash';

export function SidebarBrand(props: SidebarBrandProps) {
  const dispatch = useAppDispatch();
  const { active } = props;

  const { data: brandData, isFetching: brandIsFetching } = useGetFields({
    field: 'brand',
  });

  const uniqData = _.uniq(brandData);

  const data = useAlphabeticalSort(uniqData);

  const radioboxDisabled = useAppSelector(
    (state) => state.sidebar.radioboxDisabled
  );

  return (
    <>
      {active && (
        <div className={styled.container}>
          <>
            <SidebarRadiobox
              id="allBrands"
              title="Все производители"
              defaultChecked
              onChange={() => {
                !radioboxDisabled &&
                  dispatch(filtersChanged({ brand: undefined }));
              }}
            />
            {data.map((data, index) => {
              const isDataNotNull = () => {
                return data === null ? '#' : data;
              };
              return (
                <SidebarRadiobox
                  key={index}
                  id={isDataNotNull()}
                  title={isDataNotNull()}
                  onChange={() => {
                    dispatch(filtersChanged({ brand: data }));
                  }}
                />
              );
            })}
          </>
        </div>
      )}
    </>
  );
}
