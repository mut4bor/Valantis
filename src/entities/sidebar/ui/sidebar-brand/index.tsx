import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { Checkbox } from 'shared/ui';
import { useGetAllBrands } from 'shared/hooks/useGetAllBrands';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { filtersChanged } from 'shared/api/redux/slices/sidebarSlice';

export function SidebarBrand(props: SidebarBrandProps) {
  const { active } = props;

  const data = useGetAllBrands();

  const filteredFields = _.uniq(data);

  return (
    <>
      {active && (
        <div className={styled.container}>
          <>
            {filteredFields.map((data, index) => {
              return <Checkbox key={index} data={data} />;
            })}
          </>
        </div>
      )}
    </>
  );
}
