import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import type {Person, Response, UpdatePerson} from "../shared/interfaces";


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


  addPerson(addPersonForm: FormGroup): Observable<Response> {
    const data: object = addPersonForm.value;
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userService.getToken()}`
      })
    };
    return this.http.post<Response>(this.apiUrl, data, httpOptionsWithToken);
  }

  updatePerson(editPersonForm: FormGroup): Observable<Response> {
    const data: UpdatePerson = editPersonForm.value;
    data.status = editPersonForm.value.accountStatus === "Active" ? editPersonForm.value.accountStatus = 0 : editPersonForm.value.accountStatus = 1;

    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userService.getToken()}`
      })
    };
    return this.http.put<Response>(this.apiUrl, data, httpOptionsWithToken);
  }


  deletePerson(id: number): Observable<Response> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.getToken()}`);
    return this.http.delete<Response>(`${this.apiUrl}/${id}`, {headers});
  }
}
