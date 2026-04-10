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
  private readonly formConfig = SIGNUP_FORM_CONFIG.data.config;
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
      const allowedFields = this.getResetAllowedFields();

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
      passwordControl.label = this.getResetPasswordLabel();
      passwordControl.errorMessage.required = this.getResetPasswordRequiredMessage();
    }
  
    if (confirmPasswordControl) {
      confirmPasswordControl.label = this.getConfirmResetPasswordLabel();
      confirmPasswordControl.errorMessage.required = this.getConfirmResetPasswordRequiredMessage();
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

    subRoleIds = (formData.subRole || []).map((item: any) => item.id);
  }

  // ✅ final payload
  const finalPayload = {
    ...formData,
    professional_role: roleId,
    professional_subroles: subRoleIds,
    ...this.buildLocationPayload(),
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
    if (this.mode === 'signup') {
      const template = this.getFormConfig('signupHeaderTemplate') || 'Signup to {projectName}';
      return template.replace('{projectName}', this.configData?.projectName || '');
    }

    return this.getFormConfig('resetHeaderText') || 'Reset password';
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
        const { formPatchData, selectedLocationData } = this.buildLocationData(schoolData);
        const controlNames = new Set(
          (this.formJson?.controls || []).map((control: any) => control.name)
        );
        const patchableData = Object.fromEntries(
          Object.entries(formPatchData).filter(([field]) => controlNames.has(field))
        );

              setTimeout(() => {
                const form = this.formLib?.myForm;
                if (!form) return;

                form.patchValue(patchableData);
                this.selectedLocationData = selectedLocationData;

                Object.keys(patchableData).forEach((field) => {
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

  private buildLocationData(schoolData: any) {
    const parents = schoolData?.parentInformation ?? {};
    const formPatchData: Record<string, string> = {
      school: schoolData?.metaInformation?.name || ''
    };
    const selectedLocationData: Record<string, { id: string; name: string }> = {
      school: {
        id: schoolData?._id || '',
        name: schoolData?.metaInformation?.name || ''
      }
    };

    Object.entries(parents).forEach(([key, value]: [string, any]) => {
      const parent = Array.isArray(value) ? value[0] : value;

      formPatchData[key] = parent?.name || '';
      selectedLocationData[key] = {
        id: parent?._id || parent?.id || '',
        name: parent?.name || ''
      };
    });

    return { formPatchData, selectedLocationData };
  }

  private buildLocationPayload(): Record<string, string> {
    return Object.entries(this.selectedLocationData || {}).reduce(
      (payload: Record<string, string>, [key, value]: [string, any]) => {
        payload[key] = value?.id || '';
        return payload;
      },
      {}
    );
  }

  private getResetAllowedFields(): string[] {
    return this.getFormConfig('resetAllowedFields') || ['email', 'password', 'confirm_password'];
  }

  private getResetPasswordLabel(): string {
    return this.getFormConfig('resetPasswordLabel') || 'Enter new password';
  }

  private getConfirmResetPasswordLabel(): string {
    return this.getFormConfig('confirmResetPasswordLabel') || 'Confirm new password';
  }

  private getResetPasswordRequiredMessage(): string {
    return this.getFormConfig('resetPasswordRequiredMessage') || 'Enter new password';
  }

  private getConfirmResetPasswordRequiredMessage(): string {
    return this.getFormConfig('confirmResetPasswordRequiredMessage') || 'Re-enter new password';
  }

  private getFormConfig<K extends keyof typeof this.formConfig>(key: K): (typeof this.formConfig)[K] {
    return this.formConfig[key];
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
