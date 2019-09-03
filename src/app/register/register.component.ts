import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  formErrors = [];

  constructor(private formBuilder: FormBuilder, private router: Router, public api: AuthenticationService, private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.formErrors = [];
    this.submitted = true;
    if (this.registerForm.valid) {

    }
    this.api.register(this.registerForm.value)
      .toPromise()
      .then(res => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          this.submitted = false;
          console.log('errors', res);
          return false;
        } else {
          // set token and user cookie
          window.sessionStorage.setItem('first_name', JSON.stringify(res.first_name));
          window.sessionStorage.setItem('last_name', JSON.stringify(res.last_name));
          window.sessionStorage.setItem('uid', JSON.stringify(res.id));
          window.sessionStorage.setItem('token', JSON.stringify(res.token));
          console.log('response', res);
          this.formErrors[0] = res.message;
          this.submitted = false;
          this.api.onLoggedIn.emit(res);
        }
        setTimeout(() => {
          this.router.navigate(['payment']);
        }, 2000);
      }
      )
      .catch(err => {
        console.log(err)
      });


    /* this.dataSubscription = this.api.register(this.registerForm.value).subscribe((res) => {
     
    }, (err:any) => {
      console.log('errors', err);
    }); */
    // let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // console.log(headers);
    /* this.http.post(`${environment.apiUrl}/register`, this.registerForm.value ).subscribe(
      (res:any) => {
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res));
      },
      (error:any) => {
        console.log(error)
      }
    ); */
    //  this.router.navigate(['payment']);
  }

  /* public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    console.log("destroyed");
    window.localStorage.clear();
  } */

}
