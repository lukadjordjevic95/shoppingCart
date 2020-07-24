import { Action } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { ShippingDataModel } from 'src/app/models/shippingData.model';
import { PaymentModel } from 'src/app/models/payment.model';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SHIPPING_DATA = 'SET_SHIPPING_DATA';
export const SET_PAYMENT_DATA = 'SET_PAYMENT_DATA';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;
  constructor(public payload: ProductModel[]) { }
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: ProductModel) { }
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: ProductModel) { }
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: ProductModel) { }
}

export class SetShippingData implements Action {
  readonly type = SET_SHIPPING_DATA;
  constructor(public payload: {shippingData: ShippingDataModel, shippingDataValid: boolean}) { }
}

export class SetPaymentData implements Action {
  readonly type = SET_PAYMENT_DATA;
  constructor(public payload: {paymentData: PaymentModel, paymentDataValid: boolean}) { }
}

export type CheckoutActions = SetProducts | SetPaymentData | SetShippingData | AddProduct | RemoveProduct | UpdateProduct;
