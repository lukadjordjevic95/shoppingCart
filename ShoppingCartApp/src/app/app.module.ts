import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './pages/products/products/store/products.reducer';
import { checkoutReducer } from './pages/checkout/checkout/store/checkout.reducer';
import { environment } from 'src/environments/environment';

registerLocaleData(localeDE);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({
      products: productsReducer,
      checkout: checkoutReducer,
    }),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
