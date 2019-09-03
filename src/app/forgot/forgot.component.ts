import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { EncdecServiceService } from '../authentication/encdec-service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  email: string;
  password: string;
  submitted = false;
  loginFailed = true;
  formErrors = [];

  constructor(private formBuilder: FormBuilder, private router: Router, public api: AuthenticationService, private EncDec: EncdecServiceService) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  get f() { return this.forgotForm.controls; }

  onSubmit() {
    this.formErrors = [];
    this.submitted = true;

    this.api.forgot(this.forgotForm.value)
      .toPromise()
      .then(res => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          this.submitted = false;
          console.log('errors', res);
          return false;
        } else {
          // set token and user cookie
          // var encrypted = this.EncDec.set('email', JSON.stringify(res.email));
          // var decrypted = this.EncDec.get('email', encrypted);
          // window.sessionStorage.setItem('email', encrypted);
          /* window.sessionStorage.setItem('first_name', JSON.stringify(res.first_name));
          window.sessionStorage.setItem('last_name', JSON.stringify(res.last_name));
          window.sessionStorage.setItem('uid', JSON.stringify(res.id));
          window.sessionStorage.setItem('token', JSON.stringify(res.token)); */
          console.log('response', res);
          this.formErrors[0] = res.message;
          this.submitted = false;
          // this.api.onLoggedIn.emit(res);

          // console.log('Session', window.sessionStorage.getItem("email"));
          // console.log('Session encrypted', encrypted);
        }
        setTimeout(() => {
        this.router.navigate(['login']);
        }, 2000);
      }
      )
      .catch(err => {
        console.log('catch Errors', err)
      });

  }
}
