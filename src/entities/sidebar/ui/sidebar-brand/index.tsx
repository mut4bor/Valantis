import styled from './style.module.scss';
import { SidebarBrandProps } from './types';
import { Checkbox } from 'shared/ui';
import { useGetFields } from 'shared/hooks';

export function SidebarBrand(props: SidebarBrandProps) {
  const { active } = props;

  const { data, isFetching } = useGetFields({ field: 'brand' });

  return (
    <>
      {active && (
        <div className={styled.container}>
          <>
            {data.map((data, index) => {
              return <Checkbox key={index} data={data} />;
            })}
          </>
        </div>
      )}
    </>
  );
}
