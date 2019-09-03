import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  formErrors = [];
  userId: any;
  token: any;
  userData;
  constructor(private formBuilder: FormBuilder, private router: Router, public api: AuthenticationService, private http: HttpClient) {
    this.userId = JSON.parse(sessionStorage.getItem('uid'));
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }

ngOnInit() {
  this.editForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.minLength(6)]],
    // cpassword: ['', [Validators.minLength(6)]],
    token: [this.token]
  });

  this.http.get(`${environment.apiUrl}/getUserById/${this.userId}/${this.token}`).subscribe(
    (res: any) => {
      console.log('Response', res);
      // localStorage.setItem('user', JSON.stringify(res.data));
      this.userData = res.data;
      this.editForm.patchValue({
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        email: this.userData.email
      });
    },
    err => console.log('Form Errors', err)
  );
}

get f() { return this.editForm.controls; }

onSubmit() {
  this.formErrors = [];
  this.submitted = true;
  this.http.post(`${environment.apiUrl}/updateProfile/${this.userId}`, this.editForm.value)
    .toPromise()
    .then((res: any) => {
      if (res.error == "true") {
        this.formErrors[0] = res.message;
        this.submitted = false;
        console.log('errors', res);
        return false;
      } else {
        // set token and user cookie
        console.log('response', res);
        this.formErrors[0] = res.message;
        this.submitted = false;
        window.sessionStorage.setItem('first_name', JSON.stringify(res.first_name));
        window.sessionStorage.setItem('last_name', JSON.stringify(res.last_name));
        this.api.onLoggedIn.emit(res);
      }
      // this.router.navigate(['payment']);
    }
    )
    .catch((err: any) => {
      console.log(err)
    });
}

}
