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
  selector: 'app-register',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',

  styleUrl: './register.css'
})
export class Register {

  errorMessage = '';

  showPassword = false;

  showConfirmPassword = false;


  registerForm;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm =
      this.fb.nonNullable.group({

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^01[0125][0-9]{8}$/
            )
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],

        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ]

      });

  }


  togglePassword(): void {

    this.showPassword =
      !this.showPassword;
  }


  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;
  }


  register(): void {

    this.errorMessage = '';


    if (
      this.registerForm.invalid
    ) {

      this.registerForm
        .markAllAsTouched();

      return;
    }


    const values =
      this.registerForm
        .getRawValue();


    if (
      values.password !==
      values.confirmPassword
    ) {

      this.errorMessage =
        'كلمتا المرور غير متطابقتين';

      return;
    }


    const result =
      this.authService.register({

        name:
          values.name,

        email:
          values.email,

        phone:
          values.phone,

        password:
          values.password

      });


    if (
      !result.success
    ) {

      this.errorMessage =
        result.message;

      return;
    }


    this.router.navigate(
      ['/gifts']
    );
  }

}