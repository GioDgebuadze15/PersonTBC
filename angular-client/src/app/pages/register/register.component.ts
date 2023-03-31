import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required,]
    });

  }

  onRegister() {
    if (this.registrationForm.valid) {
      // do something with the form data
      console.log(this.registrationForm.value);
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
