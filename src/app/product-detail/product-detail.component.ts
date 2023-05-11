import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from 'src/model/product.model';
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

  constructor(private _productservice: ProductService, public _format: FormatService, private _activerouter: ActivatedRoute, private _router: Router ) {
    this._activerouter.params.subscribe(params => {
      this.product_id = params['id'];
      if (this.product_id == null || this.product_id == undefined || this.product_id == '') {
        this._router.navigate(['/']);
      }
      this.getProductById(this.product_id);
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
      }
    });
  }
}
