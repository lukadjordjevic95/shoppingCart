import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { CheckoutState } from 'src/app/pages/checkout/checkout/store/checkout.reducer';
import { RemoveProduct, UpdateProduct } from 'src/app/pages/checkout/checkout/store/checkout.actions';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  $products: Observable<CheckoutState>;
  products: ProductModel[] = [];
  price = 0;
  constructor(private store: Store,
              public modal: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.$products = this.store.select(state => state['checkout']);
    this.subscriptions.push(
      this.$products.subscribe(result => {
        this.price = 0;
        this.products = result.products;
        result.products.forEach(element => {
          this.price += (element.quantity * element.price);
        });
      })
    );
  }

  removeFromCart(item) {
    this.store.dispatch(new RemoveProduct(item));
  }

  closeModal() {
    if (this.products.length > 0 && this.modal.hasOpenModals()) {
      this.modal.dismissAll();
      this.router.navigate(['/checkout']);
    } else {
      this.modal.open(SuccessComponent, {size: 'sm'});
    }
  }

  updateProduct(item, event) {
    this.store.dispatch(new UpdateProduct({...item, ...{quantity: event.target.value}}))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe);
  }
}
