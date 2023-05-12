import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/auth.service';
import { FormatService } from 'src/service/format.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  account = {
    username: '',
    password: ''
  };

  signup_account = {
    email: '',
    phone: '',
    username: '',
    password: ''
  };

  ui = this._format.useLanguage();

  constructor(public _format: FormatService, private _auth: AuthService, private _toastr: ToastrService, private _router: Router) {
    this._auth.hasLoggedIn().subscribe({
      next: (res) => {
        if (res) {
          this._toastr.info(this.ui.already_login_message);
          this._router.navigate(['/']);
        }
      }
    });
  }

  // login
  login(account_info: any) {
    this._auth.login(account_info).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);
        this._toastr.success(this.ui.success_login_message);
        this._router.navigate(['/']);
      },
      error: (err) => {
        this._toastr.error(this.ui.fail_login_message, this.ui.fail_login);
      }
    });
  }

  // signup
  signup(account_info: any) {
    this._auth.signup(account_info).subscribe({
      next: (res) => {
        this._toastr.success(this.ui.success_register_message);
        this.resetSignupForm();
      },
      error: (err) => {
        this._toastr.error(this.ui.fail_signup_message, this.ui.fail_signup);
      }
    });
  }

  // reset signup form
  resetSignupForm() {
    this.signup_account = {
      email: '',
      phone: '',
      username: '',
      password: ''
    };
  }
}
