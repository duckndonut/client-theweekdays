import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Product, ProductDetails } from 'src/model/product.model';
import { FormatService } from './format.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private applicationHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private textHeaders = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private ui = this._format.useLanguage();

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _format: FormatService) {
    if (localStorage.getItem('token')) {
      this.applicationHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
  }

  // Get all products
  getAllProducts(): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('/v1/products', requestOptions).pipe(
      map(res => JSON.parse(res) as Product[]),
      retry(2),
      catchError(this.handleError)
    );
  }

  // Get product by id
  getProductById(id: string): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('/v1/products/' + id, requestOptions).pipe(
      map(res => JSON.parse(res) as ProductDetails),
      retry(2),
      catchError(this.handleError)
    );
  }

  getProductByName(name: string): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('/v1/products?search=' + name, requestOptions).pipe(
      map(res => JSON.parse(res) as Product[]),
      retry(2),
      catchError(this.handleError)
    );
  }

  getProductByCategory(category: string): Observable<any> {
    const requestOptions: Object = {
      headers: this.textHeaders,
      responseType: "text"
    }
    return this._http.get<any>('/v1/products?category=' + category, requestOptions).pipe(
      map(res => JSON.parse(res) as Product[]),
      retry(2),
      catchError(this.handleError)
    );
  }

  // error handling
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }

  // Add product to cart []
  // {
  //   "_id": "5f9d88b9c3b9d3b1d4b3e0b1",
  //   "variants" : "S",
  //   "quantity": 3
  // }
  // add product to cart local storage
  addToCart(product_id: string, selectedVariant: string, quantity: number, event: any) {
    event.stopPropagation();
    let cart: any[] = [];
    selectedVariant = selectedVariant.toUpperCase();
    quantity = Number(quantity);
    product_id = product_id.toString();

    if (product_id == null || product_id == undefined || product_id == '' || selectedVariant == null || selectedVariant == undefined || selectedVariant == '' || quantity == null || quantity == undefined || quantity == 0) {
      this._toastr.error(this.ui.fail_added_to_cart, this.ui.fail_add);
      return;
    }

    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart') || '{}');
    }

    // if product variant is already in cart, update quantity
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id == product_id && cart[i].variants == selectedVariant) {
        cart[i].quantity += quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        this._toastr.success(this.ui.success_added_to_cart, this.ui.success_add);
        return;
      }
    }

    // if product variant is not in cart, add new product to cart
    let product = {
      "_id": product_id,
      "variants": selectedVariant,
      "quantity": quantity
    }
    // push product to first index of cart
    cart.unshift(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this._toastr.success(this.ui.success_added_to_cart, this.ui.success_add);
    return;
  }
}
