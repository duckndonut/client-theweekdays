import { Component } from '@angular/core';
import { Product } from 'src/model/product.model';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-list-row',
  templateUrl: './listing-row.component.html',
  styleUrls: ['./listing-row.component.css']
})
export class ListRowComponent {
  source: Array<Product> = [];
  products: Array<Product> = []; // products data after filtering, sorting
  product_slides: Array<Product> = []; // products data for slides in pagination
  ui: any = this._format.useLanguage();
  pages: number = 0;
  current_page: number = 1;
  sort_mode: string = 'popularity';

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
    let top = page * 10;
    if (top > this.products.length) {
      top = this.products.length;
    }
    for (let i = (page - 1) * 10; i < top; i++) {
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

  // Change page
  changePage(page: number) {
    if (page == this.current_page) {
      return;
    }
    this.current_page = page;
    this.getProductSlides(this.current_page);
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

  // Sort products
  sortProducts(mode: string) {
    if (mode == 'rating') {
      this.products.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
    else if (mode == 'percent-off') {
      this.products.sort((a, b) => {
        return b.sale_percent - a.sale_percent;
      });
    }
    else if (mode == 'price') {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    }
    else if (mode == 'price-desc') {
      this.products.sort((a, b) => {
        return b.price - a.price;
      });
    }

    this.getProductSlides(this.current_page);
    this.goToTop();
  }

  price_filter_mode = [
    {
      name: '0-150k',
      min: 0,
      max: 150000,
      selected: false
    },
    {
      name: '150k-300k',
      min: 150000,
      max: 300000,
      selected: false
    },
    {
      name: '300k-500k',
      min: 300000,
      max: 500000,
      selected: false
    },
    {
      name: '>500k',
      min: 500000,
      max: 99999999,
      selected: false
    }
  ]

  // price filter change
  priceFilterChange() {
    // if all price filter mode are unselected, select all
    let all_unselected = true;
    for (let i = 0; i < this.price_filter_mode.length; i++) {
      if (this.price_filter_mode[i].selected) {
        all_unselected = false;
        break;
      }
    }
    if (all_unselected) {
      this.products = [...this.source];
      this.reloadDataAfterSortAndFilter();
      return;
    }

    this.products = [];
    for (let i = 0; i < this.source.length; i++) {
      for (let j = 0; j < this.price_filter_mode.length; j++) {
        if (this.source[i].price >= this.price_filter_mode[j].min && this.source[i].price <= this.price_filter_mode[j].max && this.price_filter_mode[j].selected) {
          this.products.push(this.source[i]);
          break;
        }
      }
    }
    this.reloadDataAfterSortAndFilter();
  }

  // reload data
  reloadDataAfterSortAndFilter() {
    this.sortProducts(this.sort_mode);
    this.pages = Math.ceil(this.products.length / 10);
    this.current_page = -1;
    this.changePage(1);
    this.goToTop();
  }
}
