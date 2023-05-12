import { Component } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { FormatService } from 'src/service/format.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ui = this._format.useLanguage();
  constructor( public _cartservice: CartService, public _format: FormatService ) {

  }
}
