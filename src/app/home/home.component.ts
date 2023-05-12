import { Component } from '@angular/core';
import { Product } from 'src/model/product.model';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  source: Array<Product> = [];
  products: Array<Product> = []; // products data after filtering, sorting
  product_slides: Array<Product> = []; // products data for slides in pagination
  ui: any = this._format.useLanguage();
  pages: number = 0;
  current_page: number = 1;
  sort_mode: string = 'popularity';
  recommend_products: Product[] = [];
  
  constructor(private _productservice: ProductService, public _format: FormatService) {
    this.getAllProducts();
  }
 // Get all products
 getAllProducts() {
  this._productservice.getAllProducts().subscribe({
    next: (data) => {
      // this.products = [];
      this.source = [];
      for (let i = 0; i < data.length; i++) {
        // this.products.push(new Product(data[i]));
        this.source.push(new Product(data[i]));
      }
      this.products = [...this.source];
      this.pages = Math.ceil(this.source.length / 10);
      this.getProductSlides(this.current_page);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// Generate page number array for pagination
generatePageNumberArray(num: number): Array<number> {
  let page_number_array: Array<number> = [];
  for (let i = 1; i <= num; i++) {
    page_number_array.push(i);
  }
  return page_number_array;
}

// Get product slides - 10 products per page
getProductSlides(page: number) {
  this.product_slides = [];
  let top = page * 8;
  if (top > this.products.length) {
    top = this.products.length;
  }
  for (let i = (page - 1) * 8; i < top; i++) {
    this.product_slides.push(this.products[i]);
  }
}

// active page style css
activePage(page: number): string {
  if (page === this.current_page) {
    return 'active';
  }
  return '';
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

}
