import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthResponse} from "../shared/interfaces/Person";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "https://localhost:7193/api/user";
  _isAuthorized = new BehaviorSubject<boolean>(false)
  isAuthorized = this._isAuthorized.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this._isAuthorized.next(!!localStorage.getItem('angular-client-token'));
    console.log(this.isAuthorized)
  }

  login(loginForm: FormGroup): Observable<AuthResponse> {
    const data = loginForm.value;
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data, httpOptions);
  }

  register(registrationForm: FormGroup): Observable<AuthResponse> {
    const data: object = registrationForm.value;
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('angular-client-token');
    this._isAuthorized.next(false)
    this.router.navigate(['']);

  }

  getToken(): string {
    return localStorage.getItem('angular-client-token') || "";
  }


}
