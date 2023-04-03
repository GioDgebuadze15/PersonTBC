import {Component} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Person} from "../people-table/people-table.component";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent {
  id?: number;
  // person?: Observable<Person>;
  editPersonForm: FormGroup;

  constructor(private personService: PersonService, private route: ActivatedRoute, private fb: FormBuilder,
              private router: Router) {
    this.editPersonForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalId: ['', [Validators.required, this.personalIdValidator()]],
      dateOfBirth: [null],
      gender: ['', Validators.required],
      accountStatus: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || "0");

    if (this.id > 0) {
      this.initializePersonDate(this.id);
      console.log(this.editPersonForm)
    }
  }

  initializePersonDate(id: number) {
    this.personService.getPerson(id).subscribe(data => {
      this.editPersonForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        personalId: data.personalId,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        accountStatus: data.accountStatus
      });
    });

  }

  editPerson() {
    if (this.editPersonForm.valid) {
      this.personService.updatePerson(this.editPersonForm).subscribe(() => {
        this.router.navigate(['/'])
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
