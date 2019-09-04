import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MockupsComponent } from './mockups/mockups.component';
import { PricingComponent } from './pricing/pricing.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';
import { AuthenticationService } from './authentication/authentication.service';
import { EditComponent } from './edit/edit.component';
import { EncdecServiceService } from './authentication/encdec-service.service';
import { PrivacyComponent } from './privacy/privacy.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { ForgotComponent } from './forgot/forgot.component';
import { CustomizeComponent } from './customize/customize.component';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    MockupsComponent,
    PricingComponent,
    LoginComponent,
    RegisterComponent,
    FaqComponent,
    ContactComponent,
    PaymentComponent,
    EditComponent,
    PrivacyComponent,
    ConfirmEqualValidatorDirective,
    ForgotComponent,
    CustomizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ColorPickerModule
  ],
  providers: [AuthGuardService, AuthenticationService, EncdecServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
