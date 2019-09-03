import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-mockups',
  templateUrl: './mockups.component.html',
  styleUrls: ['./mockups.component.scss']
})
export class MockupsComponent implements OnInit, OnDestroy {
  formErrors = [];
  products = [];
  categories;
  selectedCategory:string = 'All';
  isPaidUser:boolean;
  notLoggedIn:boolean;

  constructor(private http: HttpClient, private api: AuthenticationService) {
    this.api.isPaidUser.subscribe(user => {
      /* if (sessionStorage.length !== 0){
      } */
      this.isPaidUser = true;
    });
    this.api.notLoggedIn.subscribe(user => {
      /* if (sessionStorage.length !== 0){
      } */
      this.notLoggedIn = true;
    });
   }

  onChange(newValue) {
    // console.log(newValue);
    this.selectedCategory = newValue;
    this.http.get(`${environment.apiUrl}/productByCategory/${this.selectedCategory}`)
      .toPromise()
      .then((res: any) => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          // console.log('errors', res);
          return false;
        } else {
          // console.log('response', res);
          this.products = res.data;
        }
      }
      )
      .catch(err => {
        console.log(err)
      });
  }
  ngOnInit() {
    this.http.get(`${environment.apiUrl}/productByCategory/${this.selectedCategory}`)
      .toPromise()
      .then((res: any) => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          // console.log('errors', res);
          return false;
        } else {
          // console.log('response', res);
          this.products = res.data;
        }
      }
      )
      .catch(err => {
        console.log(err)
      });

    // this.http.get(`${environment.apiUrl}/categories/${this.selected}`)
    this.http.get(`${environment.apiUrl}/categories`)
      .toPromise()
      .then((res: any) => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          // console.log('errors', res);
          return false;
        } else {
          // console.log('response', res);
          this.categories = res.data;
        }
      }
      )
      .catch(err => {
        console.log(err)
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.api.isPaidUser.unsubscribe();
    // this.api.notLoggedIn.unsubscribe();
  }

}