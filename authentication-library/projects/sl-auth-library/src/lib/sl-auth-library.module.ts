import { NgModule } from '@angular/core';
import { SlAuthLibraryComponent } from './sl-auth-library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';



@NgModule({
  declarations: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent
  ],
  imports: [
    AuthRoutingModule
  ],
  exports: [
    SlAuthLibraryComponent
  ]
})
export class SlAuthLibraryModule { }
