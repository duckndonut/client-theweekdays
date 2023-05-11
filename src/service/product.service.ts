import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Product, ProductDetails } from 'src/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private applicationHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private textHeaders = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8'
  });

  constructor(private _http: HttpClient) { }

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

  // error handling
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
