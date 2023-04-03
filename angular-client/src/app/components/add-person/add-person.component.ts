import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Router} from "@angular/router";
import {Response} from "../../shared/interfaces/Person";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  addPersonForm: FormGroup;
  errorMessage?: string;
  validationErrors: Array<string> = new Array<string>();


  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router) {
    this.addPersonForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalId: ['', Validators.required],
      dateOfBirth: [null],
      gender: ['Male']
    });
  }

  addPerson(): void {
    if (this.addPersonForm.valid) {
      this.validationErrors = new Array<string>();
      this.personService.addPerson(this.addPersonForm).subscribe({
        next: ({data}) => {
          if (data) this.router.navigate(['']);
          return;
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
          const result: Response = error
          if (result.error) this.errorMessage = result.error;
        },
      });
    } else {
      this.validationErrors = new Array<string>();
      this.getAddPersonErrors();
    }
  }

  personalIdValidator(): string {
    const personalId = this.addPersonForm.value.personalId;
    if (!/^\d{11}$/.test(personalId)) {
      return 'Personal ID must be a number of length 11.';
    }
    return "";
  }

  getAddPersonErrors() {
    this.validationErrors = new Array<string>();
    for (const controlName in this.addPersonForm.controls) {
      const control = this.addPersonForm.controls[controlName];
      if (control.errors) {
        console.log(control.errors)
        if (control.getError('required'))
          this.validationErrors.push(`${controlName} is required`);
      }
    }
    const perIdValidation = this.personalIdValidator();
    if (perIdValidation !== "")
      this.validationErrors.push(perIdValidation);
  }

}
