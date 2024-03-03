import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { Checkbox } from 'shared/ui';
import { useGetAllBrands } from 'shared/hooks/useGetAllBrands';
import { useEffect } from 'react';
import { useGetFieldsQuery } from 'shared/api/redux/slices/APISlice';
import _ from 'lodash';

export function SidebarBrand(props: SidebarBrandProps) {
  const { active } = props;

  const data = useGetAllBrands();

  const filteredFields = _.uniq(data);

  console.log(filteredFields);
  return (
    <>
      {active && (
        <div className={styled.container}>
          <>
            {filteredFields.map((data, index) => {
              return (
                <Checkbox key={index} label={data === null ? '#' : data} />
              );
            })}
          </>
        </div>
      )}
    </>
  );
}
