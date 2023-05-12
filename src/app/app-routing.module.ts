import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { ListingGridComponent } from './listing-grid/listing-grid.component';
import { ListRowComponent } from './listing-row/listing-row.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CollectionComponent } from './collection/collection.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sign", component: SignComponent },
  { path: "listgrid", component: ListingGridComponent },
  { path: "listrow", component: ListRowComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "cart", component: CartComponent },
  { path: "confirmorder", component:ConfirmOrderComponent},
  { path: "order", component: TrackingOrderComponent},
  { path: "order/id", component: OrderDetailComponent}, // khi đổ dữ liệu về thì chuyển thành order/:id
  { path: "collection", component: CollectionComponent },
  {path: "aboutus", component: AboutUsComponent},
  { path: "collection/:id", component:CollectionDetailComponent},
  { path: "lookbook", component: LookbookComponent },
  { path: "account", component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
