import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbdSortableHeader } from 'src/app/includes/directives/table-sort.directive';
import { ProductsService } from 'src/app/services/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';


const routes: Routes = [
  {path: '', component: ProductsComponent}
];

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  providers: [
    ProductsService,
    NgbActiveModal
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ], exports: [
    RouterModule
  ],
})
export class ProductsModule { }
