import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormatService } from './format.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ui = this._format.useLanguage();

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _format: FormatService) { }

  // Create an order
  createOrder(order: any = {}) {
    this._http.post<any>('/v1/order', JSON.stringify(order)).subscribe({
      next: (res) => {
        this._toastr.success(this.ui.success_order_message);
      },
      error: (err) => {
        this._toastr.error(this.ui.fail_order_message);
      }
    });
  }

}
