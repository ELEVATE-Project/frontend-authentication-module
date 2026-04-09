import { Component, ViewChild, inject, Input, Renderer2 } from '@angular/core';
import { ApiBaseService } from '../../services/base-api/api-base.service';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainFormComponent } from 'dynamic-form-suma';
import { Location } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { catchError } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { HttpParams } from '@angular/common/http';
import { SIGNUP_FORM_CONFIG } from '../shared/forms/signup-form.config';
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
  selectedLocationData: any = {};
  formJson: any = SIGNUP_FORM_CONFIG.data.fields

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
    this.formJson = JSON.parse(
      JSON.stringify(SIGNUP_FORM_CONFIG.data.fields)
    );
    if (this.mode === 'reset') {
      const allowedFields = ['email', 'password', 'confirm_password'];

      this.formJson.controls = this.formJson.controls.filter(
        (control: any) => allowedFields.includes(control.name)
      );
    }
    this.updateLabelsForReset();
    this.fetchConfigData()
  }
  ngAfterViewInit() {
  if (!this.formLib) return;

  this.formLib.myForm.get('role')?.valueChanges.subscribe((role: any) => {
    if (role) {
      this.fetchSubRoles(role.id);
    }
  });
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
      this.fetchProfessionalRoles();
    });
  }

  navigateToGenerateOtpPage() {
  let formData = this.formLib?.myForm.value;

  const passwordsMatch = formData.password === formData.confirm_password;

  if (!passwordsMatch) {
    this.toastService.showToast(
      "Please enter the same password",
      'error',
      3000,
      'top',
      'end'
    );
    return;
  }

  let roleId: any = null;
  let subRoleIds: any[] = [];

  if (this.mode !== 'reset') {
    // ✅ extract ROLE ID
    const roleField = this.formJson.controls.find((f: any) => f.name === 'role');
    const selectedRole = roleField?.options?.find(
      (opt: any) => opt.value === formData.role
    );

    roleId = selectedRole?.id || null;

    // ✅ extract SUB ROLE IDS (multi-select)
    const subRoleField = this.formJson.controls.find((f: any) => f.name === 'subRole');

    subRoleIds = (formData.subRole || []).map((item: any) => item.id);
  }

  // ✅ final payload
  const finalPayload = {
    ...formData,
    professional_role: roleId,
    professional_subroles: subRoleIds,

    school: this.selectedLocationData?.school?.id,
    state: this.selectedLocationData?.state?.id,
    district: this.selectedLocationData?.district?.id,
    block: this.selectedLocationData?.block?.id,
    cluster: this.selectedLocationData?.cluster?.id,

    fromPage: this.mode
  };

  this.stateService.setData(finalPayload);
  this.router.navigate(['/otp']);
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
            if (res?.result && res.result.length > 0) {
        const schoolData = res.result[0]; 
        const parents = schoolData.parentInformation; 

              setTimeout(() => {
                const form = this.formLib?.myForm;
                if (!form) return;

                form.patchValue({
                  school: schoolData?.metaInformation?.name || '',
                  state: parents?.state?.[0]?.name || '',
                  district: parents?.district?.[0]?.name || '',
                  block: parents?.block?.[0]?.name || '',
                  cluster: parents?.cluster?.[0]?.name || ''
                });

                this.selectedLocationData = {
                  school: {
                    id: schoolData?._id,
                    name: schoolData?.metaInformation?.name
                  },
                  state: {
                    id: parents?.state?.[0]?._id,
                    name: parents?.state?.[0]?.name
                  },
                  district: {
                    id: parents?.district?.[0]?._id,
                    name: parents?.district?.[0]?.name
                  },
                  block: {
                    id: parents?.block?.[0]?._id,
                    name: parents?.block?.[0]?.name
                  },
                  cluster: {
                    id: parents?.cluster?.[0]?._id,
                    name: parents?.cluster?.[0]?.name
                  }
                };


                // disable AFTER form is created
                ['school', 'state', 'district', 'block', 'cluster'].forEach(field => {
                  form.get(field)?.disable();
                });


              }, 0);     
      }
          } else {
            this.toastService.showToast(res?.message, 'error', 3000, 'top', 'end');
          }
        }
      );
  }

  fetchProfessionalRoles() {
    if (!this.configData?.baseUrl || !this.configData?.entityType) {
      console.error('Cannot fetch roles: baseUrl or entityType missing', this.configData);
      return;
    }
    const url = `${this.configData.baseUrl}/entity-management/v1/entities/entityListBasedOnEntityType`;

    // Query parameters
    const params = new HttpParams().set('entityType', 'professional_role');

    this.baseApiService
      .get(url, '', params, this.configData.tenantId)
      .pipe(
        catchError((error) => {
          console.error('API error:', error);
          this.toastService.showToast(error?.error?.message || 'Failed to fetch professional roles', 'error', 3000, 'top', 'end');
          throw error;
        })
      )
      .subscribe((res: any) => {
        if (res?.result) {
          // You can store them in your component state here
          // this.professionalRoles = res.result;
          const roles = res.result;

          // ✅ map API to dropdown options
          const roleOptions = roles.map((item: any) => ({
            value: item.externalId,
            label: item.name,
            id: item._id   // or item.id depending on API
          }));

          // ✅ set options
          const roleField = this.formJson.controls.find((f: any) => f.name === 'role');
          roleField.options = roleOptions;

          // ✅ select first role by default
          const defaultRole = roleOptions[0];
          roleField.value = defaultRole.value;

          // ✅ trigger subrole API
          this.fetchSubRoles(defaultRole.id);
        } else {
          this.toastService.showToast(res?.message || 'No roles found', 'error', 3000, 'top', 'end');
        }
      });
  }


  fetchSubRoles(roleValue: string) {
    const url = `${this.configData.baseUrl}/entity-management/v1/entities/subEntityList/${roleValue}`;

    const params = new HttpParams().set('type', 'professional_subroles');

    this.baseApiService
      .get(url, '', params, this.configData.tenantId)
      .subscribe((res: any) => {
        if (res?.result?.count) {

          const subRoleOptions = res.result.data.map((item: any) => ({
            label: item.name,
            value: item.externalId,
            id: item._id
          }));

          const subRoleField = this.formJson.controls.find((f: any) => f.name === 'subRole');

          subRoleField.options = subRoleOptions;

          const defaultSubRole = subRoleOptions[0];

          // ✅ MUST set object
          subRoleField.value = defaultSubRole;

          // ✅ MUST patch form
          setTimeout(() => {
            this.formLib?.myForm.patchValue({
              subRole: defaultSubRole
            });
          });

        }
      });
  }

  onFieldChange(fieldName: string, value: any) {
    if (fieldName === 'role') {

      // find selected role object
      const roleField = this.formJson.controls.find((f: any) => f.name === 'role');
      const selectedRole = roleField.options.find((opt: any) => opt.value === value);

      if (selectedRole) {
        this.fetchSubRoles(selectedRole.id); // 👈 use id for API
      }

      // clear subrole before loading new
      const subRoleField = this.formJson.controls.find((f: any) => f.name === 'subRole');
      subRoleField.options = [];
      subRoleField.value = '';
    }
}
}
