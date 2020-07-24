import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from './store/checkout.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  $checkoutState: Observable<CheckoutState>;
  subscriptions: Subscription[] = [];
  constructor(private store: Store) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.$checkoutState = this.store.select(state => state['checkout'])
    this.subscriptions.push(
      this.$checkoutState.subscribe(result => {
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
