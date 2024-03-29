import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productApi from './slices/apiSlice';
import paginationSlice from './slices/paginationSlice';
import productsSlice from 'shared/api/redux/slices/productsSlice';
import sidebarSlice from './slices/sidebarSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    pagination: paginationSlice,
    products: productsSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
