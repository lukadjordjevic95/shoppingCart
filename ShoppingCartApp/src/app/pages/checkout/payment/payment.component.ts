import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../checkout/store/checkout.reducer';
import { Store } from '@ngrx/store';
import { PaymentModel } from 'src/app/models/payment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SetPaymentData } from '../checkout/store/checkout.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Input() readonly = false;
  paymentData = new PaymentModel();
  paymentForm = new FormGroup({
    accountOwner: new FormControl(this.paymentData.accountOwner, [
      Validators.required,
    ]),
    iban: new FormControl(this.paymentData.iban, [
      Validators.required,
    ]),
  });

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
        this.paymentData = result.paymentData;
        this.paymentForm.patchValue(this.paymentData);
      })
    );
  }

  onSubmit() {
    this.paymentForm.markAllAsTouched();
    this.store.dispatch(new SetPaymentData({
        paymentData: {...this.paymentData, ...this.paymentForm.value},
        paymentDataValid: !this.paymentForm.invalid
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
