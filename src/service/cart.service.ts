import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private _productservice: ProductService ) {
    this.products_in_cart = this.getProductsInCartLocal();
  }

  cart_data: any[] = [];
  products_in_cart: any[] = [];
  total: number = 0;
  final_total: number = 0;
  delivery_fee: number = 0;

  // place an order

  getCartLocal() {
    let cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
      this.cart_data = [];
    }
    else {
      this.cart_data = JSON.parse(cart);
    }
    return this.cart_data;
  }

  setCartLocal(cart_data: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart_data));
  }

  getProductsInCartLocal() {
    this.cart_data = this.getCartLocal();
    this.products_in_cart = [];
    this.cart_data.forEach( (item: any) => {
      let product: any = {};
      this._productservice.getProductById(item._id).subscribe({
        next: (data) => {
          product._id = data._id;
          product.name = data.name;
          product.price = data.price;
          product.original_price = data.original_price;
          product.image = data.image[0];
          product.quantity = item.quantity;
          product.variants = item.variants;
          product.subtotal = product.price * product.quantity;
        },
        error: (err) => {},
      });
      this.products_in_cart.push(product);
    });
    return this.products_in_cart;
  }

  increaseQuantity(index: number) {
    this.products_in_cart[index].quantity++;
    this.changeQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.products_in_cart[index].quantity--;
    this.changeQuantity(index);
  }

  changeQuantity(index: number) {
    if (this.products_in_cart[index].quantity > 0) {
      this.products_in_cart[index].subtotal = this.products_in_cart[index].price * this.products_in_cart[index].quantity;
      this.updateCartLocal();
    } else {
      this.removeProduct(index);
    }
  }

  removeProduct(index: number) {
    this.products_in_cart.splice(index, 1);
    this.updateCartLocal();
  }

  updateCartLocal() {
    let cart_data: any[] = [];
    this.products_in_cart.forEach( (item: any) => {
      cart_data.push({
        _id: item._id,
        quantity: item.quantity,
        variants: item.variants
      });
    });
    this.setCartLocal(cart_data);
  }

  getTotal() {
    this.total = 0;
    this.products_in_cart.forEach( (item: any) => {
      this.total += item.subtotal;
    });
    return this.total;
  }

  getFinalTotal() {
    this.final_total = this.total + this.delivery_fee;
    return this.final_total;
  }
}
