import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { FormatService } from 'src/service/format.service';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ProductService } from 'src/service/product.service';

import { CollectionComponent } from './collection/collection.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { WishlistComponent } from './wishlist/wishlist.component';

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
    OrderDetailComponent,
    CollectionComponent,
    AboutUsComponent,
    CollectionDetailComponent,
    LookbookComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
    })
  ],
  providers: [
    FormatService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
