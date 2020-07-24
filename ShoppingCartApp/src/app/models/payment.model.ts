export class PaymentModel {
  accountOwner: string;
  iban: string;

  constructor(data?) {
    this.accountOwner = data ? data.accountOwner : null;
    this.iban = data ? data.iban : null;
  }
}
