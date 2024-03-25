import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../model/User';
import { RegisterRequest } from '../model/RegisterRequest';
import { Role } from '../model/Role';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  user = new User('', '', '', '', 0, Role.USER, '', '');

  constructor(private _http: HttpClient) { }

  public loginUserFromRemote(email: string, password: string) {
    return this._http.post<any>(`${NAV_URL}/login`, { email, password }).pipe(
      map(
        data => {
          localStorage.setItem('USER', email);
          localStorage.setItem('ROLE', 'ADMIN');
          localStorage.setItem('TOKEN', `Bearer ${data.token}`);
          // console.log(data);
          return data;
        }
      )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('USER');
    if (user === null || user.length === 0) {
      return false;
    }
    return true;
  }

  getAuthenticatedToken() {
    return localStorage.getItem('TOKEN');
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('USER');
  }

  userType() {
    return sessionStorage.getItem('ROLE');
  }

  public adminLoginFromRemote(email: string, password: string) {
    if (email === 'sachinadmin@gmail.com' && password === 'sachin7788') {
      sessionStorage.setItem('user', email);
      sessionStorage.setItem('role', "admin");
      return true;
    }
    return false;
  }

  public registerUserFromRemote(register: RegisterRequest): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/register`, register)
  }
}