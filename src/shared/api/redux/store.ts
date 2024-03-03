import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productApi from './slices/APISlice';
import paginationSlice from './slices/PaginationSlice';
import settingsSlice from 'shared/api/redux/slices/settingsSlice';
import sidebarSlice from './slices/sidebarSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    pagination: paginationSlice,
    settings: settingsSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
