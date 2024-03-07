import { API_URL, API_AUTH_TOKEN } from 'shared/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';
import {
  Response,
  FilterBrandParams,
  FilterPriceParams,
  FilterProductParams,
  GetIdsParams,
  PricesResponse,
  ItemsResponse,
  GetItemsParams,
  GetFieldsParams,
  GetPricesParams,
} from '../types';

const generateAuthString = (password: string): string => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return md5(`${password}_${timestamp}`);
};

const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Auth', generateAuthString(API_AUTH_TOKEN));
      return headers;
    },
  }),

  endpoints: (builder) => ({
    filter: builder.query<
      Response,
      FilterBrandParams | FilterPriceParams | FilterProductParams
    >({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'filter',
          params: params,
        },
      }),
    }),

    getIds: builder.query<Response, GetIdsParams | void>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'get_ids',
          params: params,
        },
      }),
    }),

    getItems: builder.query<ItemsResponse, GetItemsParams>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'get_items',
          params: params,
        },
      }),
    }),

    getFields: builder.query<Response, GetFieldsParams>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'get_fields',
          params: params,
        },
      }),
    }),
    getPrices: builder.query<PricesResponse, GetPricesParams>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'get_fields',
          params: { field: 'price', params },
        },
      }),
    }),
  }),
});

export const {
  useFilterQuery,
  useGetIdsQuery,
  useGetFieldsQuery,
  useGetPricesQuery,
  useGetItemsQuery,
} = productApi;

export default productApi;
