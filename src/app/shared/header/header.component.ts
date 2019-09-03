import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn;
  public first_name;
  public last_name;
  public subnav: boolean = false;

  constructor(private api: AuthenticationService, private router: Router) {
    this.api.onLoggedIn.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.first_name = JSON.parse(sessionStorage.getItem('first_name'));
        this.last_name = JSON.parse(sessionStorage.getItem('last_name'));
      }
    });
    if (sessionStorage && sessionStorage.token) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {
    this.first_name = JSON.parse(sessionStorage.getItem('first_name'));
    this.last_name = JSON.parse(sessionStorage.getItem('last_name'));
  }
  toggle() {
    this.subnav = !this.subnav;
  }
  onLogout() {
    sessionStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  sidebarOpen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('nav-open');
    const close = document.getElementsByClassName('close-layer')[0];
    close.classList.add('opened');
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
    const close = document.getElementsByClassName('close-layer')[0];
    close.classList.remove('opened');
  };

}
