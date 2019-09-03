import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  onLoggedIn = new EventEmitter<any>();
  notLoggedIn = new EventEmitter<any>();
  isPaidUser = new EventEmitter<any>();
  constructor(public http: HttpClient) {
   }

  login(data: any): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = `${environment.apiUrl}/register`;
    return this.http.post(url, data);
  }

  forgot(data: any): Observable<any> {
    const url = `${environment.apiUrl}/forgotPassword`;
    return this.http.post(url, data);
  }

  payment(data: any): Observable<any> {
    const url = `${environment.apiUrl}/payment`;
    return this.http.post(url, data);
  }

  public getProduct(productId) {
    const url = `${environment.apiUrl}/products/${productId}`;
    return this.http.get(url);
  }

  public auth(userId: any, token: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/getUserById/${userId}/${token}`);
  }

  /* logout(token: string): Observable<any> {
    const url = `${environment.apiUrl}/logout`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  } */
  /* public isAuthenticated(): Boolean {
    if ( typeof localStorage.getItem('currentUserId') === 'undefined' || localStorage.getItem('currentUserId') === null ){
      return false;
    }
    if (localStorage.getItem('currentUserId').length !== 0 ) {
      return true;
    }
    return false;
  } */
}
