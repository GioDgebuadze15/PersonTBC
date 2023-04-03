import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject, tap} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

interface LoginResponse {
  statusCode: number;
  error?: string;
  token?: string;
  // Other properties of the API response, if any
}

interface RegistrationResponse {
  statusCode: number;
  error?: string;
  token?: string;
  // Other properties of the API response, if any
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "https://localhost:7193/api/user";
  private _isAuthorized = new BehaviorSubject<boolean>(false)
  isAuthorized = this._isAuthorized.asObservable();
  isUserAuthorized: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this._isAuthorized.next(!!localStorage.getItem('angular-client-token'));
    console.log(this.isAuthorized)
  }

  login(loginForm: FormGroup): void {
    const data = loginForm.value;
    this.http.post<LoginResponse>(`${this.apiUrl}/login`, data, httpOptions).subscribe(response => {
      if (response.statusCode === 200 && response.token) {
        const token = response.token;
        localStorage.setItem('angular-client-token', token);
        this._isAuthorized.next(true)
        this.router.navigate(['']);
      }
      //Todo: handle error here
    });
  }

  register(registrationForm: FormGroup): void {
    const data: object = registrationForm.value;
    this.http.post<RegistrationResponse>(`${this.apiUrl}/register`, data, httpOptions).subscribe(response => {
      if (response.statusCode === 200 && response.token) {
        const token = response.token;
        localStorage.setItem('angular-client-token', token);
        this._isAuthorized.next(true)
        this.router.navigate(['']);
      }
      //Todo: handle error here
    });
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
