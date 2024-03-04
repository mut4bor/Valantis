import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { useGetFields } from 'shared/hooks';
import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { SidebarRadiobox } from '../sidebar-radiobox';

export function SidebarBrand(props: SidebarBrandProps) {
  const { active } = props;

  const { data, isFetching: brandIsFetching } = useGetFields({
    field: 'brand',
  });

  const radioboxDisabled = useAppSelector(
    (state) => state.sidebar.radioboxDisabled
  );

  const dispatch = useAppDispatch();

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
                    !radioboxDisabled &&
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
