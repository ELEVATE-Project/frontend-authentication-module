import { Component, ViewChild, inject, Input, Renderer2 } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainFormComponent } from 'elevate-dynamic-form';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { catchError } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
@Component({
  selector: 'lib-singup-reset-pass',
  templateUrl: './singup-reset-pass.component.html',
  styleUrl: './singup-reset-pass.component.css'
})
export class SingupResetPassComponent {
  @ViewChild('formLib') formLib: MainFormComponent | undefined;
  mode: 'signup' | 'reset' = 'signup';
  baseApiService: ApiBaseService;
  endPointService: EndpointService;
  router: Router;
  configData: any;
  location: Location;
  toastService: ToastService;
  formJson: any = {
    controls: [
      {
        name: 'name',
        label: 'Name',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Enter Name",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50
        },
      },
      {
        name: 'username',
        label: 'Username',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Enter Username",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50
        },
      },
      {
        name: 'email',
        label: 'Email',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Please enter registered email ID",
          email: "Enter a valid email ID"
        },
        validators: {
          required: true,
          email: true
        },
      },
      {
        name: 'password',
        label: 'Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        errorMessage: {
          required: "Enter password",
          minlength: "Password should contain minimum of 10 characters",
          pattern: "Password must have at least one uppercase letter, one number, one special character, and be at least 10 characters long"
        },
        validators: {
          required: true,
          minLength: 10,
          pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/
        },
      },
      {
        name: 'confirm_password',
        label: 'Confirm Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        errorMessage: {
          required: "Re-enter password",
          minlength: "Password should contain minimum of 10 characters"
        },
        validators: {
          required: true,
          minLength: 10,
        },
      },

      {
        name: 'role',
        label: 'Role',
        value: '',
        class: 'ion-no-margin',
        type: 'select',
        position: 'floating',
        options: [
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Admin', value: 'schoolHead' }
         ],
        errorMessage: {
          required: "Enter Name",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          // pattern: /^[a-zA-Z\s]*$/,
          // maxLength:50
        },
      },

      {
        name: 'subRole',
        label: 'Sub-Role',
        value: '',
        class: 'ion-no-margin',
        type: 'select',
        position: 'floating',
        options: [
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Admin', value: 'schoolHead' }
         ],
        errorMessage: {
          required: "Enter Name",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          // required: true,
          // pattern: /^[a-zA-Z\s]*$/,
          maxLength:50
        },
      },

      {
        name: 'registrationCode',
        label: 'Registration Code',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Enter Registration Code",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50
        },
      },

      {
        name: 'udise',
        label: 'UDISE Code',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        errorMessage: {
          required: "Enter UDISE Code",
          pattern: "This field can only contain numbers"
        },
        validators: {
          required: true,
          pattern: /^[0-9]*$/,
          maxLength:50
        },
      },

      {
        name: 'state',
        label: 'State',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        disabled:true,
        errorMessage: {
          required: "Enter State",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50,
        },
      },

      {
        name: 'district',
        label: 'District',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        disabled:true,
        errorMessage: {
          required: "Enter District",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50,
        },
      },

      {
        name: 'block',
        label: 'Block',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        disabled:true,
        errorMessage: {
          required: "Enter Block",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50,
        },
      },

      {
        name: 'cluster',
        label: 'Cluster',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        disabled:true,
        errorMessage: {
          required: "Enter Cluster",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50,
        },
      },

      {
        name: 'school',
        label: 'School',
        value: '',
        class: 'ion-no-margin',
        type: 'text',
        position: 'floating',
        disabled:true,
        errorMessage: {
          required: "Enter School",
          pattern: "This field can only contain alphabets"
        },
        validators: {
          required: true,
          pattern: /^[a-zA-Z\s]*$/,
          maxLength:50,
        },
      },
    ],
  };

  constructor(private stateService: StateService, private route: ActivatedRoute
    , private renderer: Renderer2
  ) {
    this.baseApiService = inject(ApiBaseService);
    this.endPointService = inject(EndpointService);
    this.router = inject(Router);
    this.location = inject(Location);
    this.toastService = inject(ToastService);
  }

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'];
    if (this.mode === 'reset') {
      this.formJson.controls = this.formJson.controls.filter((control: any) => control.name !== 'name');
      this.updateLabelsForReset();
    }
    this.fetchConfigData();
    this.fetchProfessionalRoles();
  }

  updateLabelsForReset() {
    const passwordControl = this.formJson.controls.find((control: any) => control.name === 'password');
    const confirmPasswordControl = this.formJson.controls.find((control: any) => control.name === 'confirm_password');
    if (passwordControl) {
      passwordControl.label = 'Enter new password';
      passwordControl.errorMessage.required = 'Enter new password';
    }
  
    if (confirmPasswordControl) {
      confirmPasswordControl.label = 'Confirm new password';
      confirmPasswordControl.errorMessage.required = 'Re-enter new password';
    }
  }

  async fetchConfigData() {
    this.endPointService.getEndpoint().pipe(
      catchError((error) => {
        this.toastService.showToast('An error occurred while fetching configData', 'error', 3000, 'top', 'end')
        throw error
      })
    ).subscribe(data => {
      this.configData = data;
    });
  }

  navigateToGenerateOtpPage() {
    const formData = this.formLib?.myForm.value
    const passwordsMatch = formData.password === formData.confirm_password;
    if (passwordsMatch) {
      formData.fromPage = this.mode;
      this.stateService.setData(formData);
      this.router.navigate(['/otp']);
    } else {
      this.toastService.showToast("Please enter the same password", 'error', 3000, 'top', 'end');
    }
  }

  navigateBack() {
    if (window.history.length < 1) {
      this.location.back();
    } else {
      this.router.navigate(['/landing']);
    }
  }

  get headerText(): string {
    return this.mode === 'signup' ? `Signup to ${this.configData?.projectName}` : 'Reset password';
  }

  fetchUdiseCode(){
    console.log("343", this.formLib?.myForm.value)
    this.baseApiService
      .get(
        this.configData?.baseUrl,
        this.configData?.fetchUdiseCodeApiPath + '/' + this.formLib?.myForm.value.udise,
        undefined,
        this.configData?.tenantId
        
      ).pipe(
        catchError((error) => {
          this.toastService.showToast(error?.error?.message, 'error', 3000, 'top', 'end');
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          if (res?.result) {
            console.log("res 358", res)
            if (res?.result && res.result.length > 0) {
        const schoolData = res.result[0]; 
        const parents = schoolData.parentInformation; 
        console.log("result 364", res.result )
        
        this.formLib?.myForm.patchValue({
          school: schoolData.metaInformation?.name,
          state: parents?.state?.[0]?.name,       
          district: parents?.district?.[0]?.name,
          block: parents?.block?.[0]?.name,
          cluster: parents?.cluster?.[0]?.name
        });
        console.log("form value 395", this.formLib?.myForm.value)
      }
          } else {
            this.toastService.showToast(res?.message, 'error', 3000, 'top', 'end');
          }
        }
      );
  }
   
  fetchProfessionalRoles(){
    console.log("405", "fetch professional roles")

    this.baseApiService
      .get(
        this.configData?.baseUrl,
        this.configData?.entityType,
        undefined,
        this.configData?.tenantId
        
      ).pipe(
        catchError((error) => {
          this.toastService.showToast(error?.error?.message, 'error', 3000, 'top', 'end');
          throw error
        })
      )
      .subscribe(
        (res: any) => {
          if (res?.result) {
            console.log("res 427", res)
           
          } else {
            this.toastService.showToast(res?.message, 'error', 3000, 'top', 'end');
          }
        }
      );
  }
}
