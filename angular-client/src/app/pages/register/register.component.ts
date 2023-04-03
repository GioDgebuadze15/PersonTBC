import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthResponse} from "../../shared/interfaces/Person";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage?: string;
  validationErrors: Array<string> = new Array<string>();

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required,]
    });

  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.validationErrors = new Array<string>();
      this.userService.register(this.registrationForm).subscribe({
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
          const result: AuthResponse = error
          if (result.error) this.errorMessage = result.error;
        },
      });

    } else {
      this.validationErrors = new Array<string>();
      this.getRegistrationErrors();
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  passwordMatchValidator(formGroup: FormGroup): boolean {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  getRegistrationErrors() {
    this.validationErrors = new Array<string>();
    for (const controlName in this.registrationForm.controls) {
      const control = this.registrationForm.controls[controlName];
      if (control.errors) {
        console.log(control.errors)
        if (control.getError('required'))
          this.validationErrors.push(`${controlName} is required`);
        if (control.getError('email'))
          this.validationErrors.push(`${controlName} is not valid`);
      }
    }
    if (!this.passwordMatchValidator(this.registrationForm))
      this.validationErrors.push(`Passwords do not match`);

  }


}
