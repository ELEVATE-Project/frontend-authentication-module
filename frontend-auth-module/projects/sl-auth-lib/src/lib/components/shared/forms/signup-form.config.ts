export const SIGNUP_FORM_CONFIG = {
    "type": "signUpForm",
    "sub_type": "SignUpForm",
    "action": "create",
    "data": {
        "config": {
            "signupHeaderTemplate": "Signup to {projectName}",
            "resetHeaderText": "Reset password",
            "resetAllowedFields": ["email", "password", "confirm_password"],
            "resetPasswordLabel": "Enter new password",
            "confirmResetPasswordLabel": "Confirm new password",
            "resetPasswordRequiredMessage": "Enter new password",
            "confirmResetPasswordRequiredMessage": "Re-enter new password"
        },
        "templateName": "defaultTemplate",
        "fields": {
            "controls": [
                {
                    "name": "name",
                    "label": "Name",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Enter Name",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "username",
                    "label": "Username",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Enter Username",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "email",
                    "label": "Email",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Please enter registered email ID",
                        "email": "Enter a valid email ID"
                    },
                    "validators": {
                        "required": true,
                        "email": true
                    }
                },
                {
                    "name": "password",
                    "label": "Password",
                    "value": "",
                    "class": "ion-margin",
                    "type": "password",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Enter password",
                        "minlength": "Password should contain minimum of 10 characters",
                        "pattern": "Password must have at least one uppercase letter, one number, one special character, and be at least 10 characters long"
                    },
                    "validators": {
                        "required": true,
                        "minLength": 10,
                        "pattern": "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$"
                    }
                },
                {
                    "name": "confirm_password",
                    "label": "Confirm Password",
                    "value": "",
                    "class": "ion-margin",
                    "type": "password",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Re-enter password",
                        "minlength": "Password should contain minimum of 10 characters"
                    },
                    "validators": {
                        "required": true,
                        "minLength": 10
                    }
                },
                {
                    "name": "role",
                    "label": "Role",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "select",
                    "position": "floating",
                    "cssStyle": "relative w-[100%]",
                    "options": [],
                    "errorMessage": {
                        "required": "Enter Name",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true
                    }
                },
                {
                    "name": "subRole",
                    "label": "Sub-Role",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "select",
                    "position": "floating",
                    "isMultiSelect": "true",
                    "options": [
                        {
                            "label": "Student",
                            "value": "student"
                        },
                        {
                            "label": "Teacher",
                            "value": "teacher"
                        },
                        {
                            "label": "Admin",
                            "value": "schoolHead"
                        }
                    ],
                    "errorMessage": {
                        "required": "Enter Name",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "maxLength": 50
                    }
                },
                {
                    "name": "registrationCode",
                    "label": "Registration Code",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Enter Registration Code",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "udise",
                    "label": "UDISE Code",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "errorMessage": {
                        "required": "Enter UDISE Code",
                        "pattern": "This field can only contain numbers"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[0-9]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "state",
                    "label": "State",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "disabled": true,
                    "errorMessage": {
                        "required": "Enter State",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "district",
                    "label": "District",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "disabled": true,
                    "errorMessage": {
                        "required": "Enter District",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "block",
                    "label": "Block",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "disabled": true,
                    "errorMessage": {
                        "required": "Enter Block",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "cluster",
                    "label": "Cluster",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "disabled": true,
                    "errorMessage": {
                        "required": "Enter Cluster",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                },
                {
                    "name": "school",
                    "label": "School",
                    "value": "",
                    "class": "ion-no-margin",
                    "type": "text",
                    "position": "floating",
                    "disabled": true,
                    "errorMessage": {
                        "required": "Enter School",
                        "pattern": "This field can only contain alphabets"
                    },
                    "validators": {
                        "required": true,
                        "pattern": "^[a-zA-Z\\s]*$",
                        "maxLength": 50
                    }
                }
            ]
        }
    }
}
