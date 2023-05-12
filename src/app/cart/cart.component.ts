import { Component } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  ui = this._format.useLanguage();

  constructor( public _cartservice: CartService, private _productservice: ProductService, public _format: FormatService ) {
    this._cartservice.getProductsInCartLocal();
  }
}
