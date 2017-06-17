import { Component, OnInit } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../coreModule/service/authentication.service';
import { UserProfile } from '../../beans/userProfile';

@Component(
    {
        selector: 'profileInfo',
        templateUrl: 'profileinfo.html'
    }
)

export class ProfileInfoComponent{
    userProfile: UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    constructor(private authenticationService: Auth,
        private fb: FormBuilder,
        private router: Router){

        this.profileForm = this.fb.group({
            firstName: [this.userProfile .firstName, Validators.required],
            lastName: [this.userProfile .lastName, Validators.required],
            email: [this.userProfile.email, [Validators.required, Validators.email]],
            gender: [this.userProfile.gender, Validators.required],
            age: ['', [Validators.required]]
        });
        this.profileForm.valueChanges
         .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    profileForm: FormGroup;

    onSubmit() {
        const profileModel = this.profileForm.value;
        this.userProfile.firstName = profileModel.firstName;
        this.userProfile.lastName = profileModel.lastName;
        this.userProfile.email = profileModel.email;
        this.userProfile.gender = profileModel.gender;
        this.userProfile.age = profileModel.age;

        this.authenticationService.updateUserProfile(this.userProfile);

        this.router.navigate(['/userSetup/financialInformation']);
    }

    onValueChanged(data?: any){
        if (!this.profileForm) { return; }
        const form = this.profileForm;

        for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'gender': '',
        'age': ''
    };

    validationMessages = {
        'firstName': {
            'required':      'First Name is required.'
        },
        'lastName': {
            'required':      'Last Name is required.'
        },
        'email': {
            'required':      'Email is required.',
            'email':       'Email is invalid.'
        },
        'gender': {
            'required':      'Gender is required.'
        },
        'age': {
            'required':      'Age is required.'
        }
  };
}