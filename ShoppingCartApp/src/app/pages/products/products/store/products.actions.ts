import { Action } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
  constructor(public payload: ProductModel[]) { }
}
