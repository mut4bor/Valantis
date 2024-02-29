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
  brand?: string | null;
  price?: number;
  product?: string;
}
export interface GetIdsParams {
  offset?: number;
  limit?: number;
}
export interface GetItemsParams {
  ids: string[] | undefined;
}
export interface GetFieldsParams {
  field: string;
  offset?: number;
  limit?: number;
}
