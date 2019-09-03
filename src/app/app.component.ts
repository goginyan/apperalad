import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'apperalad';
  localStorage;
  visibility: boolean;
  constructor() {
  }
    ngOnInit() {
  }

  ngOnDestroy() {
    this.localStorage.clear();
  }


}
