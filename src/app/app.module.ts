import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { ListingGridComponent } from './listing-grid/listing-grid.component';
import { ListRowComponent } from './listing-row/listing-row.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignComponent,
    HomeComponent,
    ListingGridComponent,
    ListRowComponent,
    ProductDetailComponent,
    TrackingOrderComponent,
    CartComponent,
    ConfirmOrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
