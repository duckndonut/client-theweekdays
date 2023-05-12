import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  account: any;
  constructor() {
    this.account = this.getSessionUser(sessionStorage);
  }
  getSessionUser(req:any) {
    if (req.session && req.session.active && req.session.user) {
      return {
        user: req.session.user
      };
    } else {
      return null;
    }
  }
}
