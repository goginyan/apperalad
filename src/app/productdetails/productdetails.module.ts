import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';


import { ProductdetailsRoutingModule } from './productdetails-routing.module';
import { DetailsComponent } from './details/details.component';
//import { CustomizeComponent } from './customize/customize.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    ProductdetailsRoutingModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    ],
  bootstrap: [DetailsComponent],
 })
export class ProductdetailsModule { }
