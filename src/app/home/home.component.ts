import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formErrors = [];
  testimonials = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/testimonials`)
    .toPromise()
    .then((res:any) => {
      if (res.error == "true") {
        this.formErrors[0] = res.message;
        console.log('errors', res);
        return false;
      } else {
        console.log('response', res);
        this.testimonials = res.data;
      }
    }
    )
    .catch(err => {
      console.log(err)
    });
  }

}
