import { ProductModel } from 'src/app/models/product.model';
import { Action } from '@ngrx/store';
import { GET_PRODUCTS, GetProducts } from './products.actions';

const initialState = {
  products: []
};

export function productsReducer(state = initialState, action: GetProducts) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default: return state;
  }
}
