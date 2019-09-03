import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  submitted = false;
  formErrors = [];
  constructor(private formBuilder: FormBuilder, private router: Router, public api: AuthenticationService, private http: HttpClient) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNo: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cardCVV: ['', Validators.required]
    });
  }

  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.formErrors = [];
    this.submitted = true;
    if (this.paymentForm.valid) {

    }
    this.api.payment(this.paymentForm.value)
      .toPromise()
      .then(res => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          this.submitted = false;
          console.log('errors', res);
          return false;
        } else {
          // set token and user cookie
          window.sessionStorage.setItem('email', JSON.stringify(res.email));
          window.sessionStorage.setItem('token', JSON.stringify(res.token));
          console.log('response', res);
          //this.formErrors[0] = res.message;
          this.submitted = false;
        }
        this.router.navigate(['payment']);
      }
      )
      .catch(err => {
        console.log(err)
      });
    //  this.router.navigate(['payment']);
  }

}
