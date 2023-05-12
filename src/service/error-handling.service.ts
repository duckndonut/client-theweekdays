import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormatService } from './format.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  ui = this._format.useLanguage();

  constructor(private _router: Router, private _format: FormatService, private _toastr: ToastrService) { }

  handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      // Havent login yet
      this._toastr.error(this.ui.error_http_401, this.ui.error_http);
      this._router.navigate(['/sign']);
    } else if (error.status == 403) {
      // Dont have permission
      this._toastr.error(this.ui.error_http_403, this.ui.error_http);
      this._router.navigate(['/']);
    } else if (error.status == 404) {
      // Not found
      this._toastr.error(this.ui.error_http_404, this.ui.error_http);
      this._router.navigate(['/']);
    } else if (error.status == 500) {
      // Server error
      this._toastr.error(this.ui.error_http_500, this.ui.error_http);
      this._router.navigate(['/']);
    } else {
      // Other error
      this._toastr.error(this.ui.error_http_unknown, this.ui.error_http);
      this._router.navigate(['/']);
    }
  }
}
