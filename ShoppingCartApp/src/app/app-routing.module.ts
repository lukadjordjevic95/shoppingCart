import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', loadChildren: './pages/products/products.module#ProductsModule'},
  {path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
