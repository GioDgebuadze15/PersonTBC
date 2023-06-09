import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import type {AuthResponse} from "../../shared/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage?: string;
  validationErrors: Array<string> = new Array<string>();

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.resetErrors();
      this.userService.login(this.loginForm).subscribe({
        next: ({token}) => {
          if (token) {
            localStorage.setItem('angular-client-token', token);
            this.userService._isAuthorized.next(true)
            this.router.navigate(['']);
            return;
          }
        },
        error: ({error}) => {
          if (error.errors) {
            for (const key in error.errors) {
              if (error.errors.hasOwnProperty(key)) {
                this.validationErrors = this.validationErrors.concat(
                  error.errors[key]
                );
              }
            }
          }
          const result: AuthResponse = error;
          if (result.error) this.errorMessage = result.error;
        },
      });

    } else {
      this.resetErrors();
      this.getLoginErrors();
    }


  }

  getLoginErrors(): void {
    for (const controlName in this.loginForm.controls) {
      const control = this.loginForm.controls[controlName];
      if (control.errors) {
        if (control.getError('required'))
          this.validationErrors.push(`${controlName} is required`);
        if (control.getError('email'))
          this.validationErrors.push(`${controlName} is not valid`);
      }
    }

  }


  goToRegistrationPage():void {
    this.router.navigate(['/register']);
  }

  resetErrors(): void {
    this.validationErrors = new Array<string>();
  }
}
