# SL-auth-library

SL-auth-library is an Angular library project designed to provide authentication-related functionality that can be reused across various Shikshalokam solution implementations. This library includes components, services, and directives for handling authentication flows such as login, Signup, and password reset.

## Features

- **Login**: Provides a login component for users to authenticate with their credentials.
- **Signup**: Allows users to register for a new account.
- **Password Reset**: Enables users to reset their password if forgotten.

## Installation

### 1. Install Node.js and npm

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [here](https://nodejs.org/).

### 2. Install Angular 14 CLI

Angular 14 CLI is a command-line interface for Angular 14 development. Install it globally using npm:

```bash
npm install -g @angular/cli@14
```
## Testing
Clone the SL-auth-library repository to your local machine:
```bash
git clone <repository-url>
```
change directory to project:
```bash
cd authentication-library
```
Install the project dependencies using npm:
```bash
npm install
```
Build the library using :
```bash
ng build sl-auth-library
```
## Usage
### 1. Importing the module
In **sl-auth-library.module.ts** import **SlAuthLibraryModule**
```bash
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlAuthLibraryModule } from 'sl-auth-library'; // import here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlAuthLibraryModule // import here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### 2. Using the components
Once the module is imported, you can use the authentication-related components in your application's templates. For example:
```bash
<lib-login></lib-login>
<lib-signup></lib-signup>
<lib-forgotpassword></lib-forgotpassword>
```
### 3. Configuring routing
If you're using routing in your application, make sure to configure the routes for the authentication-related components in your routing module <code>sl-auth-library.module.ts</code>.
```bash
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
```

## Architecture diagram
          +-----------------------------------+
          |          SL-auth-library          |
          +-----------------------------------+
          |       Components & Modules       |
          |                                   |
          |   +---------------------------+   |
          |   |      Authentication     |   |
          |   |     (AuthComponent)       |   |
          |   +---------------------------+   |
          |   |                           |   |
          |   |   +-------------------+   |   |
          |   |   |     Login         |   |   |
          |   |   | (LoginComponent)  |   |   |
          |   |   +-------------------+   |   |
          |   |   |                   |   |   |
          |   |   |   +-----------+   |   |   |
          |   |   |   |  Signup   |   |   |   |
          |   |   |   |(SIgnupComponent)  |   |
          |   |   |   +-----------+   |   |   |
          |   |   |                   |   |   |
          |   |   |   +-----------+   |   |   |
          |   |   |   |Forgotpassword |   |   |
          |   |   |   | (PasswordResetComponent) |
          |   |   |   +-----------+   |   |   |
          |   |   +-------------------+   |   |
          |   +---------------------------+   |
          |                                   |
          +-----------------------------------+
          |            Services               |
          |                                   |
          |   +---------------------------+   |
          |   |     AuthService           |   |
          |   |                           |   |
          |   +---------------------------+   |
          |                                   |
          |       Routing Configurations      |
          |                                   |
          |   +---------------------------+   |
          |   |       AppRoutingModule    |   |
          |   |  (Router configurations)  |   |
          |   +---------------------------+   |
          +-----------------------------------+

## Need Help?

If you need any assistance or guidance while using this library, you can refer to the [Angular documentation](https://angular.io/docs) for detailed information on Angular concepts, APIs, and best practices.

