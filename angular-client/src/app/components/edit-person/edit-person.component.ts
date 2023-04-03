import {Component} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import type {Response} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent {
  id?: number;
  editPersonForm: FormGroup;
  errorMessage?: string;
  validationErrors: Array<string> = new Array<string>();

  constructor(private personService: PersonService, private route: ActivatedRoute, private fb: FormBuilder,
              private router: Router) {
    this.editPersonForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalId: ['', Validators.required],
      dateOfBirth: [null],
      gender: ['', Validators.required],
      accountStatus: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || "0");

    if (this.id > 0) {
      this.initializePersonDate(this.id);
    }
  }

  initializePersonDate(id: number): void {
    this.personService.getPerson(id).subscribe(data => {
      const birthDate = data.dateOfBirth == null ? null : (new Date(data.dateOfBirth).toISOString().substring(0, 10));
      this.editPersonForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        personalId: data.personalId,
        dateOfBirth: birthDate,
        gender: data.gender,
        accountStatus: data.accountStatus
      });
    });

  }

  editPerson(): void {
    if (this.editPersonForm.valid) {
      this.resetErrors();
      this.personService.updatePerson(this.editPersonForm).subscribe({
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
          const result: Response = error;
          if (result.error) this.errorMessage = result.error;
        },
      });
    } else {
      this.resetErrors();
      this.getEditPersonErrors();
    }
  }

  personalIdValidator(): string {
    const personalId = this.editPersonForm.value.personalId;
    if (!/^\d{11}$/.test(personalId)) {
      return 'Personal ID must be a number of length 11.';
    }
    return "";
  }

  getEditPersonErrors(): void {
    this.validationErrors = new Array<string>();
    for (const controlName in this.editPersonForm.controls) {
      const control = this.editPersonForm.controls[controlName];
      if (control.errors) {
        if (control.getError('required'))
          this.validationErrors.push(`${controlName} is required`);
      }
    }
    const perIdValidation: string = this.personalIdValidator();
    if (perIdValidation !== "")
      this.validationErrors.push(perIdValidation);
  }

  resetErrors(): void {
    this.validationErrors = new Array<string>();
  }

}
