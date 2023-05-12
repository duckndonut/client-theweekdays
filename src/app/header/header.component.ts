import { Component } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ui = this._format.useLanguage();
  appear = 'invisible';
  listProduct: any;
  name = '';
  constructor(public _cartservice: CartService, public _format: FormatService, private productService: ProductService) {
    //get first 4 product

  }

  search() {
    if (this.appear === 'invisible') {
      this.appear = 'visible';
    }
    else {
      this.appear = 'invisible';
    }
  }

  searchAppear = 'invisible'

  getProductByName(name: string) {
    if (name === '') {
      this.listProduct = [];
      return;
    }
    else {
      this.productService.getProductByName(name).subscribe(data => {
        this.listProduct = data.slice(0, 4);
      });
    }
  }
}
