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
create a demo app
```bash
ng generate application demo-app
```
paste the selector in <code>app.component.html</code> in demo app for example :
```bash
<lib-sl-auth-library></lib-sl-auth-library>
```
Now you have to build the library for testing
```bash
cd projects/sl-auth-library
```
```bash
ng build --configuration production
```
now go back to your dist folder and **'run npm'** pack it will create a tarball package example : <code>sl-auth-library-0.0.1.tgz</code> 
```bash
cd dist/sl-auth-library
```
```bash
npm pack
```
now we have to install <code>sl-auth-library-0.0.1.tgz</code> in our demo app for that we have to go back to our demo app <code>cd projects/demo-app</code> copy the path of <code>sl-auth-library-0.0.1.tgz</code> and npm install in <code>projects/demo-app</code> like this 
```bash
npm install /home/Desktop/frontend-authentication-module/authentication-library/dist/sl-auth-library/sl-auth-library-0.0.1.tgz
```

## Usage
### 1. Importing the module
In **app.module.ts** import **SlAuthLibraryModule**
```bash
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlAuthLibraryModule } from 'sl-auth-library'; // here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlAuthLibraryModule // here
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
If you're using routing in your application, make sure to configure the routes for the authentication-related components in your routing module <code>auth-routing.module.ts</code>.
```bash
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../public-api';
import { SignupComponent } from '../../public-api';
import { ForgotpasswordComponent } from '../../public-api';


const routes: Routes =[
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
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
          |   |       AuthRoutingModule   |   |
          |   |  (Router configurations)  |   |
          |   +---------------------------+   |
          +-----------------------------------+

## Need Help?

If you need any assistance or guidance while using this library, you can refer to the [Angular documentation](https://angular.io/docs) for detailed information on Angular concepts, APIs, and best practices.

