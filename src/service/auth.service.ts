import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _errorHandlingService: ErrorHandlingService) { }

  // haslogged in
  hasLoggedIn(): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }

    return this._http.get<any>('/auth/verify', requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(2),
      catchError((error) => {
        this._errorHandlingService.handleError(error);
        return throwError(error);
      })
    )
  }

  // login
  login(account: any = {}): Observable<any> {
    // header
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    )
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }

    // request
    return this._http.post<any>('/auth/login', JSON.stringify(account), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(2),
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  // register
  signup(account: any = {}): Observable<any> {
    //header
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }

    //request
    return this._http.post<any>('/auth/signup', JSON.stringify(account), requestOptions).pipe(
      map(res => JSON.parse(res)),
      catchError((error) => {
        return throwError(error);
      })
    )
  }
}
