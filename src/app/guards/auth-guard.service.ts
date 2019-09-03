import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  userId: any;
  token: any;
  showPopUp:boolean;

  constructor(public api: AuthenticationService) {
    this.userId = JSON.parse(sessionStorage.getItem('uid'));
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.auth(this.userId,this.token).toPromise()
      .then((res: any) => {
        console.log('Data', res);
        if (res.data.paid == '0' || res.error == true || typeof sessionStorage.getItem('uid') === 'undefined' || typeof sessionStorage.getItem('uid') === null) {
          console.log("show Register popup");
          this.api.isPaidUser.emit(res);
          return false;
        } else {
          console.log("Navigate to Route");
          return true;
        }
      }).catch(err => {
        console.log(err)
        this.api.notLoggedIn.emit(err);
      });
    /* this.http.get(`${environment.apiUrl}/getUserById/${this.userId}/${this.token}`).toPromise()
      .then((res: any) => {
        if (res.data.paid == "0") {
          console.log("show Register popup")
          return false;
        } else {
          console.log("navigate to details page")
          return true;
        }
      }).catch(err => {
        console.log(err)
      }); */



    /* if (sessionStorage.getItem('token')) {
      // logged in so return true
      return true;
    } */
  }
}
