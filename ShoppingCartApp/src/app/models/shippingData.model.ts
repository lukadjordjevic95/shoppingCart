export class ShippingDataModel {
  firstName: string;
  secondName: string;
  address: string;
  telephone: string;

  constructor(data?) {
    this.firstName = data ? data.firstName : null;
    this.secondName = data ? data.secondName : null;
    this.address = data ? data.address : null;
    this.telephone = data ? data.telephone : null;
  }
}
