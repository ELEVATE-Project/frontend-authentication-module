import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  passMatch: boolean = false;
  isActiveName: boolean = false;
  SignupForm!: FormGroup
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    },{
      validators: this.mustMatch('password','confirmPassword')
    })
  }

  hideshowPass(){
    this.isText = !this.isText;
    this.type = this.isText?"text":"password";
  }
   
  get f(){return this.SignupForm.controls };
  
  //password matching functionality
  mustMatch(controlName: string, matchingControlName:string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors['mustMatch']){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch: true});
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit(){
    console.log(this.SignupForm.value);
  }
}
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    