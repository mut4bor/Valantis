export interface Response {
  result: string[];
}
export interface FieldsResponse {
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
  id?: string | undefined;
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
}
export interface GetFieldsParams {
  field: 'brand' | 'id' | 'price' | 'product';
  offset?: number;
  limit?: number;
}
