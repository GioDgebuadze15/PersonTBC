import {Injectable} from '@angular/core';
import type {Person} from '../components/people-table/people-table.component'
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "./user.service";



@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private apiUrl: string = "https://localhost:7193/api/person"

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  searchPeople(searchString: string): Observable<Person[]> {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<Person[]>(`${this.apiUrl}/search`, {params});
  }


  addPerson(addPersonForm: FormGroup): Observable<Person> {
    const data: object = addPersonForm.value;
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userService.getToken()}`
      })
    };
    console.log(data)
    return this.http.post<Person>(this.apiUrl, data, httpOptionsWithToken);
  }

  updatePerson(editPersonForm: FormGroup): Observable<Person> {
    const data: object = editPersonForm.value;
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userService.getToken()}`
      })
    };
    return this.http.put<Person>(this.apiUrl, data, httpOptionsWithToken);
  }

  deletePerson(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getToken()}`);
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }
}
