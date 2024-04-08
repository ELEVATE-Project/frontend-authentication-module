import { NgModule } from '@angular/core';
import { SlAuthLibraryComponent } from './sl-auth-library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgetPassword } from './components/forget-password/forget-password.component';


@NgModule({
  declarations: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    ForgetPassword
  ],
  imports: [ReactiveFormsModule,CommonModule
  ],
  exports: [
    SlAuthLibraryComponent
  ]
})
export class SlAuthLibraryModule { }
