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
  display: string = "visibility_off";
  matching: boolean = false;
  SignupForm!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }


  hideshowPass(){
    this.isText = !this.isText;
    this.isText ? this.display = "visibility": this.display="visibility_off";
    this.type = this.isText?"text":"password";
  }

  onSubmit(){
    console.log(this.SignupForm.value.password);
    if(this.SignupForm.value.password === this.SignupForm.value.confirmPassword){
      this.matching = false;
    }
    else{
      this.matching = true;
    }
  }
}
