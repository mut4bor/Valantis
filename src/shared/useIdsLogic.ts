import _ from 'lodash';
import { useEffect } from 'react';
import { useGetIdsQuery } from 'shared/redux/slices/APISlice';
import { useAppDispatch, useAppSelector } from 'shared/redux/hooks';
import { maxValueChanged } from 'shared/redux/slices/PaginationSlice';

export const useIdsLogic = (): void => {
  const dispatch = useAppDispatch();

  const {
    data: allIdsData,
    error: allIdsError,
    refetch: allIdsRefetch,
  } = useGetIdsQuery();

  const filteredAllIdsData = _.uniq(allIdsData?.result);

  allIdsError && allIdsRefetch();

  const productsToShow = useAppSelector(
    (state) => state.pagination.productsToShow
  );

  useEffect(() => {
    dispatch(
      maxValueChanged(Math.ceil(filteredAllIdsData.length / productsToShow))
    );
  }, [filteredAllIdsData]);

  return;
};
