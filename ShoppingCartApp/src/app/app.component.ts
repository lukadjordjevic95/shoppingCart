import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { CheckoutState } from './pages/checkout/checkout/store/checkout.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ShoppingCartApp';
  $checkoutState: Observable<CheckoutState>;
  constructor(private store: Store) {
    this.$checkoutState = this.store.select(state => state['checkout']);
    this.$checkoutState.subscribe(result => {
      localStorage.setItem('localState', JSON.stringify(result));
    });
  }
}
