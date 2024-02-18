import { NgModule } from '@angular/core';
import { SlAuthLibraryComponent } from './sl-auth-library.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgotpassword', component:ForgotpasswordComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full' },
  {path: '**', redirectTo:'/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    SlAuthLibraryComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    RouterModule
  ]
})
export class SlAuthLibraryModule { }
