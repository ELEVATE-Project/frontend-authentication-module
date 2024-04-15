import { NgModule } from '@angular/core';
import { SlAuthLibraryComponent } from './sl-auth-library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatInputModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [
    SlAuthLibraryComponent,
    LoginComponent
  ]
})
export class SlAuthLibraryModule { }
