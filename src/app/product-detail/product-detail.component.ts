import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductDetails } from 'src/model/product.model';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: ProductDetails = new ProductDetails();
  ui = this._format.useLanguage();
  product_id: string = '';
  selected_variant: string = 'S';
  quantity: number = 1;
  recommend_products: Product[] = [];

  constructor(public _productservice: ProductService, public _format: FormatService, private _activerouter: ActivatedRoute, private _router: Router, private _toastr: ToastrService ) {
    this._activerouter.params.subscribe(params => {
      this.product_id = params['id'];
      if (this.product_id == null || this.product_id == undefined || this.product_id == '') {
        this._router.navigate(['/']);
      }
      this.getProductById(this.product_id);
      this.getRecommendProducts(4);
      this.reset();
      window.scrollTo(
        {
          top: 0,
          behavior: 'smooth'
        });
    });
  }

  // Get product by id
  getProductById(id: string) {
    this._productservice.getProductById(id).subscribe({
      next: (data) => {
        this.product = new ProductDetails(data);
      },
      error: (err) => {
        console.log(err);
        this._router.navigate(['/']);
      }
    });
  }

  // Get recommend products
  getRecommendProducts(num: number) {
    let recommend_product_index: number[] = [];
    this.recommend_products = [];
    this._productservice.getAllProducts().subscribe({
      next: (data) => {
        for (let i = 0; i < num; i++) {
          while (true) {
            let index = Math.floor(Math.random() * data.length);
            if (recommend_product_index.indexOf(index) == -1) {
              recommend_product_index.push(index);
              this.recommend_products.push(new Product(data[index]));
              break;
            }
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  reset() {
    this.selected_variant = 'S';
    this.quantity = 1;
  }
}
