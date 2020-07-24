import { PaymentModel } from 'src/app/models/payment.model';
import { SET_PRODUCTS, SET_SHIPPING_DATA, SET_PAYMENT_DATA, CheckoutActions, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT } from './checkout.actions';
import { ShippingDataModel } from 'src/app/models/shippingData.model';
import { ProductModel } from 'src/app/models/product.model';

export interface CheckoutState {
  products: ProductModel[];
  shippingData: ShippingDataModel;
  paymentData: PaymentModel;
  shippingDataValid: boolean;
  paymentDataValid: boolean;
}

const initialState: CheckoutState = {
  products: [],
  shippingData: new ShippingDataModel(),
  paymentData: new PaymentModel(),
  shippingDataValid: false,
  paymentDataValid: false
};

export function checkoutReducer(state, action: CheckoutActions) {
  const localState = JSON.parse(localStorage.getItem('localState'));
  if (localState) {
    state = localState;
  } else {
    state = initialState;
  }
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case SET_SHIPPING_DATA:
      return {
        ...state,
        shippingData: action.payload.shippingData,
        shippingDataValid: action.payload.shippingDataValid
      };
    case SET_PAYMENT_DATA:
      return {
        ...state,
        paymentData: action.payload.paymentData,
        paymentDataValid: action.payload.paymentDataValid
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case REMOVE_PRODUCT:
      const productId = state.products.findIndex(element => element.id === action.payload.id);
      const products = [...state.products];
      const productsUpdate = products.splice(productId, 1);
      return {
        ...state,
        products: state.products.filter(element => element.id !== action.payload.id)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.products.findIndex(element => element.id === action.payload.id);
      const product = state.products[productIndex];
      const updatedProduct = {...product, ...action.payload};
      const updatedProducts = [...state.products];
      updatedProducts[productIndex] = updatedProduct;
      return {
        ...state,
        products: updatedProducts
      };
    default: return state;
  }
}
