import { API_URL, API_AUTH_TOKEN } from 'shared/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';

interface FilterParams {
  price: number;
}

interface FilterResponse {
  result: string[];
}

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
    filter: builder.query<FilterResponse, FilterParams>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: {
          action: 'get_ids',
          params: {},
        },
      }),
    }),
  }),
});

export const { useFilterQuery } = productApi;

export default productApi;
