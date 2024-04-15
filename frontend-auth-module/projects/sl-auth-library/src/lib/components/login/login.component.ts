import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  type: string = 'password';
  display: string = 'visibility_off';
  isActiveEmail: boolean = false;
  isActivePass: boolean = false;

  formFields = [
    { name: 'email', label: 'Email', type: 'email', showIcon: false, icon: '' },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      showIcon: true,
      icon: 'visibility_off',
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      recaptchaReactive: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  isFieldInvalid(field: any) {
    const control = this.loginForm.get(field.name);
    return control?.invalid && (control.dirty || control.touched);
  }

  setActive(field: any, isActive: boolean) {
    if (field.name === 'email') {
      this.isActiveEmail = isActive;
    } else if (field.name === 'password') {
      this.isActivePass = isActive;
    }
  }

  isActive(field: any) {
    if (field.name === 'email') {
      return this.isActiveEmail;
    } else if (field.name === 'password') {
      return this.isActivePass;
    }
    return false;
  }

  togglePasswordVisibility(field: any) {
    field.type = field.type === 'password' ? 'text' : 'password';
    field.icon = field.type === 'password' ? 'visibility_off' : 'visibility';
  }

  getFieldErrors(field: any) {
    const formControl = this.loginForm.get(field.name);
    const errors = [];
    if (formControl?.errors) {
      if (formControl.errors['required']) {
        errors.push({ message: `${field.label} is required.` });
      }
      if (formControl.errors['email']) {
        errors.push({ message: `Enter a valid ${field.label} ID.` });
      }
      if (formControl.errors['minlength']) {
        errors.push({
          message: `Please enter minimum 8 characters for ${field.label}.`,
        });
      }
    }
    return errors;
  }
  public onSubmit() {
    console.log(this.loginForm.value);
  }
}
