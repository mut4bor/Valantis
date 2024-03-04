import _ from 'lodash';
import { useEffect } from 'react';
import { useGetIdsQuery } from 'shared/api/redux/slices/APISlice';
import { useAppDispatch, useAppSelector } from 'shared/api/redux/hooks';
import { maxValueChanged } from 'shared/api/redux/slices/PaginationSlice';

export const useIdsLogic = (): void => {
  const dispatch = useAppDispatch();
  const { productsToShow } = useAppSelector((state) => state.settings);
  const { data, isError, refetch } = useGetIdsQuery();

  useEffect(() => {
    if (isError) refetch();
  }, [isError, refetch]);

  const filteredAllIdsData = _.uniq(data?.result);

  useEffect(() => {
    dispatch(
      maxValueChanged(Math.ceil(filteredAllIdsData.length / productsToShow))
    );
  }, [filteredAllIdsData, productsToShow]);
};
