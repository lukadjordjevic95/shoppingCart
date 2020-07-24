export class ProductModel {
  id: string;
  name: string;
  price: number;
  quantity: number;

  constructor(data?) {
    this.id = data ? data.id : null;
    this.name = data ? data.name : null;
    this.price = data ? data.price : null;
    this.quantity = data ? data.quantity : 0;
  }
}
