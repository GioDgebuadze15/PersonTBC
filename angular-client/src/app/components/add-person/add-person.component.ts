import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  addPersonForm: FormGroup;


  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router) {
    this.addPersonForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalId: ['', [Validators.required, this.personalIdValidator()]],
      dateOfBirth: [null],
      gender: ['', Validators.required]
    });
  }

  addPerson(): void {
    if (this.addPersonForm.valid) {
      this.personService.addPerson(this.addPersonForm).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  personalIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const personalId = control.value;
      if (personalId === null || personalId === '') {
        return {'personalId': {value: personalId, message: 'Personal ID is required.'}};
      }
      if (!/^\d{11}$/.test(personalId)) {
        return {'personalId': {value: personalId, message: 'Personal ID must be a number of length 11.'}};
      }
      return null;
    };
  }

}
