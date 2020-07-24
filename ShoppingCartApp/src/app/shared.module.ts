import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CartComponent } from './includes/cart/cart.component';
import { NgbdSortableHeader } from './includes/directives/table-sort.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SuccessComponent } from './includes/success/success.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CartComponent,
    NgbdSortableHeader,
    SuccessComponent
  ],
  exports: [
    CommonModule,
    NgbModalModule,
    NgbNavModule,
    NgbdSortableHeader,
    CartComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    CartComponent,
    SuccessComponent
  ]
})
export class SharedModule { }
