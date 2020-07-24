import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { Store } from '@ngrx/store';
import { GetProducts } from '../pages/products/products/store/products.actions';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient,
              private store: Store) { }

  getProducts() {
    return this.http.get(environment.productsApi).subscribe((result: ProductModel[]) => {
      this.store.dispatch(new GetProducts(result));
    });
  }

  addProducts() {
    return this.http.post(environment.productsApi, {
      name: 'Product' + Math.random(),
      quantity: 1,
      price: Math.floor(Math.random() * (10 * 100 - 100) + 100) / 100
    }).subscribe(data => this.getProducts());
  }

}
