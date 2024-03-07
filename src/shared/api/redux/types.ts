export interface Response {
  result: string[];
}
export interface PricesResponse {
  result: number[];
}

export interface ItemsResponse {
  result: [
    {
      brand: string | null;
      id: string;
      price: number;
      product: string;
    }
  ];
}
export interface FilterBrandParams {
  brand: string | null | undefined;
}
export interface FilterPriceParams {
  price: number | undefined;
}
export interface FilterProductParams {
  product: string | undefined;
}
export interface GetIdsParams {
  offset?: number;
  limit?: number;
}
export interface GetItemsParams {
  ids: string[] | undefined;
}
export interface GetFieldsParams {
  field: 'brand' | 'price' | 'product';
  offset?: number;
  limit?: number;
}
export interface GetPricesParams {
  offset?: number;
  limit?: number;
}
