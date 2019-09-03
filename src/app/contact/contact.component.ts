import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  email: string;
  password: string;
  submitted = false;
  loginFailed = true;
  formErrors = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comments: ['', Validators.required]
    })
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.formErrors = [];
    this.submitted = true;

    this.http.post(`${environment.apiUrl}/contactUs/`, this.contactForm.value)
      .toPromise()
      .then((res:any) => {
        if (res.error == "true") {
          this.formErrors[0] = res.message;
          this.submitted = false;
          console.log('errors', res);
          return false;
        } else {
          // set token and user cookie
          // var decrypted = this.EncDec.get('email', encrypted);
          // window.sessionStorage.setItem('email', encrypted);
          console.log('response', res);
          this.formErrors[0] = res.message;
          this.submitted = false;
          // console.log('Session', window.sessionStorage.getItem("email"));
          // console.log('Session encrypted', encrypted);
        }
      }
      )
      .catch(err => {
        console.log('catch Errors', err)
      });

  }

}
