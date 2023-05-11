import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _productservice: ProductService, public _format: FormatService, private _activerouter: ActivatedRoute, private _router: Router ) {
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

  // Add product to cart []
  // {
  //   "_id": "5f9d88b9c3b9d3b1d4b3e0b1",
  //   "variants" : "S",
  //   "quantity": 3
  // }
  addToCart(product_id: string, selectedVariant: string, quantity: number) {
    let cart: any[] = [];
    selectedVariant = selectedVariant.toUpperCase();
    quantity = Number(quantity);
    product_id = product_id.toString();

    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') || '{}');
    }

    // if product variant is already in cart, update quantity
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id == product_id && cart[i].variants == selectedVariant) {
        cart[i].quantity += quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        // TOAST HERE
        return;
      }
    }

    // if product variant is not in cart, add new product to cart
    let product = {
      "_id": product_id,
      "variants": selectedVariant,
      "quantity": quantity
    }
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    // TOAST HERE
    return;
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
