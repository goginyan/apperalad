import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CustomizeComponent } from './customize/customize.component';


const routes: Routes = [
  { path: '', component: DetailsComponent },
  { path: 'customize', component: CustomizeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductdetailsRoutingModule { }
