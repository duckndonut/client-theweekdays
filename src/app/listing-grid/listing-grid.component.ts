import { Component } from '@angular/core';
import { Product } from 'src/model/product.model';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.css']
})
export class ListingGridComponent {
  products: Array<Product> = [];
  product_slides: Array<Product> = [];
  ui: any = this._format.useLanguage();
  pages: number = 0;
  current_page: number = 1;

  constructor(private _productservice: ProductService, public _format: FormatService) {
    this.getAllProducts();
  }

  // Get all products
  getAllProducts() {
    this._productservice.getAllProducts().subscribe({
      next: (data) => {
        this.products = [];
        for (let i = 0; i < data.length; i++) {
          this.products.push(new Product(data[i]));
        }
        this.pages = Math.ceil(this.products.length / 10);
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
    let top = page * 9;
    if (top > this.products.length) {
      top = this.products.length;
    }
    for (let i = (page - 1) * 10; i < top; i++) {
      this.product_slides.push(this.products[i]);
    }
  }

  // active page
  activePage(page: number): string {
    if (page === this.current_page) {
      return 'active';
    }
    return '';
  }

  // Change page
  changePage(page: number) {
    if (page == this.current_page) {
      return;
    }
    this.current_page = page;
    this.getProductSlides(page);
    this.goToTop();
  }

  // Previous page
  previousPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.getProductSlides(this.current_page);
      this.goToTop();
    }
  }

  // Next page
  nextPage() {
    if (this.current_page < this.pages) {
      this.current_page++;
      this.getProductSlides(this.current_page);
      this.goToTop();
    }
  }

  // Go to the top of the page with specific behavior speed - smooth
  goToTop() {
    window.scrollTo({
      top: 250,
      behavior: 'smooth'
    });
  }

}
