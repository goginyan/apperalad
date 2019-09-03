import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MockupsComponent } from './mockups/mockups.component';
import { PricingComponent } from './pricing/pricing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { PaymentComponent } from './payment/payment.component';
import { EditComponent } from './edit/edit.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CustomizeComponent } from './productdetails/customize/customize.component';

const routes: Routes = [
  { path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
  { path: 'mockups', component: MockupsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'edit', component: EditComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'details/:id', loadChildren: './productdetails/productdetails.module#ProductdetailsModule' },
  { path: 'customize', component: CustomizeComponent },

  /* {
    path: 'details/:id', loadChildren: './productdetails/productdetails.module#ProductdetailsModule', resolve: {
      news: DetailsResolver
    }
  }, */
  //{ path: 'details', loadChildren: './productdetails/productdetails.module#ProductdetailsModule', canActivate: [AuthGuardService]},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
