import {
  Component
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';


@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  loading = false;

  errorMessage = '';

  successMessage = '';

  showPassword = false;


  loginForm;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm =
      this.fb.nonNullable.group({

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
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


  login(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (
      this.loginForm.invalid
    ) {

      this.loginForm
        .markAllAsTouched();

      return;
    }


    this.loading = true;


    const result =
      this.authService.login(
        this.loginForm
          .getRawValue()
      );


    this.loading = false;


    if (
      !result.success
    ) {

      this.errorMessage =
        result.message;

      return;
    }


    this.successMessage =
      result.message;


    setTimeout(
      () => {

        this.router.navigate(
          ['/gifts']
        );

      },
      500
    );
  }

}