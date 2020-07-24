import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { FormControl } from '@angular/forms';
import { SortEvent, NgbdSortableHeader } from 'src/app/includes/directives/table-sort.directive';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from 'src/app/includes/cart/cart.component';
import { AddProduct } from '../../checkout/checkout/store/checkout.actions';


// sort function
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  filter = new FormControl('');
  $products: Observable<{products: ProductModel[]}>;
  $cartProducts: Observable<{products: ProductModel[]}>;
  subscriptions: Subscription[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private productsService: ProductsService,
              private store: Store,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal
              ) { }

  ngOnInit() {
    this.loadData();
    this.filterProducts();
  }

  loadData() {
    this.productsService.getProducts();
    this.$products = this.store.select(state => state['products']);
    this.$cartProducts = this.store.select(state => state['checkout']);
    this.subscriptions.push(
      this.$products.subscribe(result => {
        this.products = result.products;
        // This is for generating initial list of products
        if (this.products.length < 5) {
          for (let i = 0; i < 5; i++) {
          this.productsService.addProducts();
          }
        }
        //
        this.filteredProducts = this.products;
      })
    );
  }

  filterProducts() {
    this.filter.valueChanges.subscribe(value => {
      this.filteredProducts = this.products.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting
    if (direction === '' || column === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = [...this.products].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  addToCart(item: ProductModel, quantity) {
    this.store.dispatch(new AddProduct({...item, ...{quantity}}));
  }

  openCart() {
    this.modalService.open(CartComponent,
      {size: 'lg'});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

}
