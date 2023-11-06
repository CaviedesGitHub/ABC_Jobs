import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './Login';
import { User } from './User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://gateway.eba-brqkktps.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  userLogIn(login: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/auth/login', login);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'/auth/signup', user);
  }

}
