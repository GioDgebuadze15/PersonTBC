import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import * as XLSX from 'xlsx';

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  personalId: number;
  dateOfBirth: string;
  gender: string;
  accountStatus: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    firstName: 'Giorgi',
    lastName: 'Dgebuadze',
    personalId: 19001107342,
    dateOfBirth: "05/05/2022",
    gender: 'Male',
    accountStatus: 1
  },
  {
    firstName: 'Valeri',
    lastName: 'Gelovani',
    personalId: 192313342,
    dateOfBirth: "03/04/2022",
    gender: 'Female',
    accountStatus: 0
  },
];


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'personalId', 'dateOfBirth', 'gender', 'accountStatus', 'buttons'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
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


  saveTableDataToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(ELEMENT_DATA);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  }
}
