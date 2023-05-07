import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { ListingGridComponent } from './listing-grid/listing-grid.component';
import { ListRowComponent } from './listing-row/listing-row.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sign", component: SignComponent },
  { path: "listgrid", component: ListingGridComponent },
  { path: "listrow", component: ListRowComponent },
  { path: "detail", component: ProductDetailComponent },
  { path: "cart", component: CartComponent },
  { path: "confirmorder", component:ConfirmOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
