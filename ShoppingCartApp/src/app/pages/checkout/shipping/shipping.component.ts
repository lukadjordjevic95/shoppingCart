import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShippingDataModel } from 'src/app/models/shippingData.model';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../checkout/store/checkout.reducer';
import { Store } from '@ngrx/store';
import { SetShippingData } from '../checkout/store/checkout.actions';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.sass']
})
export class ShippingComponent implements OnInit, OnDestroy {
  @Input() readonly = false;
  shippingData = new ShippingDataModel();
  shippingForm = new FormGroup({
    firstName: new FormControl(this.shippingData.firstName, [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+'),
    ]),
    secondName: new FormControl(this.shippingData.secondName, [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+'),
    ]),
    address: new FormControl(this.shippingData.address, [
      Validators.required,
    ]),
    telephone: new FormControl(this.shippingData.telephone, [
      Validators.required,
      Validators.pattern('^[0-9\+]+$'),
    ])
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
        this.shippingData = result.shippingData;
        this.shippingForm.patchValue(this.shippingData);
      })
    );
  }

  onSubmit() {
    this.shippingForm.markAllAsTouched();
    this.store.dispatch(new SetShippingData({
        shippingData: {...this.shippingData, ...this.shippingForm.value},
        shippingDataValid: !this.shippingForm.invalid
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
