import {
  Component
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl:
    './forgot-password.html',

  styleUrl:
    './forgot-password.css'
})
export class ForgotPassword {

  errorMessage = '';

  successMessage = '';

  showPassword = false;


  resetForm;


  constructor(
    private fb:
      FormBuilder,

    private authService:
      AuthService
  ) {

    this.resetForm =
      this.fb.nonNullable.group({

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ]

      });

  }


  togglePassword(): void {

    this.showPassword =
      !this.showPassword;
  }


  resetPassword(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (
      this.resetForm.invalid
    ) {

      this.resetForm
        .markAllAsTouched();

      return;
    }


    const values =
      this.resetForm
        .getRawValue();


    const result =
      this.authService
        .resetPassword(
          values.email,
          values.newPassword
        );


    if (
      !result.success
    ) {

      this.errorMessage =
        result.message;

      return;
    }


    this.successMessage =
      result.message;


    this.resetForm.reset();

  }

}