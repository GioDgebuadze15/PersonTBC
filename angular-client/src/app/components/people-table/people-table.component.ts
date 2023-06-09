import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PersonService} from '../../services/person.service'
import * as XLSX from 'xlsx';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import type {Person} from "../../shared/interfaces";
import type {Response} from "../../shared/interfaces";


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent {
  people: Person[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'personalId', 'dateOfBirth', 'gender', 'accountStatus', 'buttons'];
  dataSource: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  private isAuthorized: boolean = false;
  errorMessage?: string;

  constructor(private personService: PersonService, private router: Router, private userService: UserService) {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter) => {
      const searchTerms = filter.split(' ');
      return searchTerms.every(term =>
        data.firstName.toLowerCase().includes(term) ||
        data.lastName.toLowerCase().includes(term) ||
        data.personalId.toString().includes(term)
      );
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleEnter(event: Event): void {
    const searchString = (event.target as HTMLInputElement).value;
    if (searchString === "") {
      this.initializePeople();
      return;
    }
    this.personService.searchPeople(searchString).subscribe((data) => {
      this.initializePeopleAfterSearch(data);
    })
  }

  search(value: string): void {
    if (value === "") {
      this.initializePeople();
      return;
    }
    this.personService.searchPeople(value).subscribe((data) => {
      this.initializePeopleAfterSearch(data);
    })
  }


  saveTableDataToExcel(): void {
    this.personService.getPeople().subscribe((people) => {
      const worksheet = XLSX.utils.json_to_sheet(people);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'People Data');
      XLSX.writeFile(workbook, 'people-data.xlsx');
    });

  }

  goToEditPage(id: number): void {
    this.router.navigate([`edit-person/${id}`])
  }

  goToAddPage(): void {
    this.router.navigate(['add-person'])
  }

  delete(id: number): void {
    this.userService.isAuthorized.subscribe(value => {
      this.isAuthorized = value;
    });
    if (!this.isAuthorized) {
      this.router.navigate(['login'])
      return;
    }
    this.personService.deletePerson(id).subscribe({
      next: ({data}) => {
        if (data) this.initializePeople();
        return;
      },
      error: ({error}) => {
        const result: Response = error;
        if (result.error) this.errorMessage = result.error;
      },
    });
  }

  ngOnInit(): void {
    this.initializePeople();
  }

  initializePeople(): void {
    this.personService.getPeople().subscribe((people) => {
      this.dataSource = new MatTableDataSource<Person>(people);
    });
  }

  initializePeopleAfterSearch(people: Person[]): void {
    this.dataSource = new MatTableDataSource<Person>(people);
  }
}
