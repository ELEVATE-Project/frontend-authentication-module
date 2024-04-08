import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-forget',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPassword implements OnInit {

  resetForm: FormGroup;
  showPasswordMatch:boolean=false;
  errorMessage:string='';

  constructor(private formBuilder: FormBuilder) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(8)]]
    });
   }

  ngOnInit(): void {

  }

  // function to be run after click on reset button
  public onSubmit() {
    if(!this.passwordMatchValidator(this.resetForm)){
      this.errorMessage='Please enter the same password'
      this.showPasswordMatch=true;
      setTimeout(()=>{
        this.showPasswordMatch=false;
      },4000)
    }
  }


  // password and confirm password check function 
  private passwordMatchValidator(formGroup: FormGroup):boolean {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }
}



