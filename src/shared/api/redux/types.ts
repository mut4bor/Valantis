export interface Response {
  result: string[];
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
export interface FilterParams {
  brand?: string | null | undefined;
  price?: number | undefined;
  product?: string | undefined;
}
export interface GetIdsParams {
  offset?: number;
  limit?: number;
}
export interface GetItemsParams {
  ids: string[] | undefined;
  offset?: number;
  limit?: number;
}
export interface GetFieldsParams {
  field: 'brand' | 'id' | 'price' | 'product';
  offset?: number;
  limit?: number;
}
