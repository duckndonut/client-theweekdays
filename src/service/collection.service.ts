import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private _http: HttpClient) { }
    // get all collection
    getCollections(): Observable<any> {
      const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
      const requestOptions: Object = {
        headers: headers,
        responseType: "text"
      }
      return this._http.get<any>("/v1/collection", requestOptions).pipe(
        map(res => JSON.parse(res)),
        retry(3),
        catchError(this.handleError))
    }

    // get collection by page
    getCollectionsByPage(page: number): Observable<any> {
      const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
      const requestOptions: Object = {
        headers: headers,
        responseType: "text"
      }
      return this._http.get<any>(`/v1/collection/?page=${page}`, requestOptions).pipe(
        map(res => JSON.parse(res)),
        retry(3),
        catchError(this.handleError))
    }
    //get collection by id
    getCollectionById(id: string): Observable<any> {
      const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
      const requestOptions: Object = {
        headers: headers,
        responseType: "text"
      }
      return this._http.get<any>(`/v1/collection/${id}`, requestOptions).pipe(
        map(res => JSON.parse(res)),
        retry(3),
        catchError(this.handleError))
    }

    //handle error
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      }
      else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
}
