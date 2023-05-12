import { Component } from '@angular/core';
import { Category } from 'src/model/category.model';
import { CartService } from 'src/service/cart.service';
import { CategoryService } from 'src/service/category.service';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ui = this._format.useLanguage();
  errMessage = '';
  appear = 'invisible';
  listProduct: any;
  name = '';
  pant:Array<Category> = [];
  top :Array<Category> = [];
  cate:Array<Category> = [];
  constructor(public _cartservice: CartService, public _format: FormatService, private productService: ProductService, private CategoryService: CategoryService) {
    //get first 4 product
    this.getCategories();
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

  getCategories() {
    this.CategoryService.getCategories().subscribe(
      {
        next: (data) => { this.cate = data;
          if(this.cate.length != 0) {
            for(let i = 0; i < this.cate.length; i++){
              if(this.cate[i].type === 'Quần'){
                this.pant.push(this.cate[i]);
              }
              else if(this.cate[i].type === 'Áo'){
                this.top.push(this.cate[i]);
              }
            }
          }

        },
        error: (err) => { this.errMessage = err }
      }
    )
  }
}
