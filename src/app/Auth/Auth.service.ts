import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './Login';
import { User } from './User';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  //private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://gateway.eba-brqkktps.us-east-2.elasticbeanstalk.com';
  
  constructor(private http: HttpClient, 
    private router: Router, 
    private roleService: NgxRolesService, 
    private permissionsService: NgxPermissionsService) { }

  userLogIn(login: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/auth/login', login);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'/auth/signup', user);
  }

  start(): void {
    this.roleService.flushRoles();
    const role = localStorage.getItem('role');
    if (!role) {
      this.setGuestRole();
    } else if (role === 'ADMIN') {
      this.setAdministratorRole();
    } else if (role === 'CANDIDATE') {
      this.setCandidateRole();
    } else if (role === 'COMPANY') {
      this.setCompanyRole();
    } else if (role === 'ABCJOBS EMPLOYEE') {
      this.setEmployeeRole();
    }else {
      this.setGuestRole();
    }
  }

  setGuestRole(): void {
    this.roleService.flushRoles();
    this.roleService.addRole('GUEST', ['']);
  }

  setCandidateRole(): void {
    this.roleService.flushRoles();
    this.roleService.addRole('CANDIDATE', ['']);
    localStorage.setItem('role', 'CANDIDATE');
  }

  setCompanyRole(): void {
    this.roleService.flushRoles();
    this.roleService.addRole('COMPANY', ['']);
    localStorage.setItem('role', 'COMPANY');
  }
  
  setEmployeeRole(): void {
    this.roleService.flushRoles();
    this.roleService.addRole('ABCJOBS EMPLOYEE', ['']);
    localStorage.setItem('role', 'ABCJOBS EMPLOYEE');
  }

  setAdministratorRole(): void {
    this.roleService.flushRoles();
    this.roleService.addRole('ADMIN',['']);
    localStorage.setItem('role', 'ADMIN');
  }

  printRole(): void {
    console.log(this.roleService.getRoles());
  }

  /**
   * Logs the user in with the desired role
   * @param role The desired role to set to the user
   */
  setRole(role:string): void {
    if (role === 'ADMIN') {
      this.setAdministratorRole();
    } 
    else if(role === 'CANDIDATE') {
      this.setCandidateRole();
    }
    else if(role === 'COMPANY') {
      this.setCompanyRole();
    }
    else if(role === 'ABCJOBS EMPLOYEE') {
      this.setEmployeeRole();
    }
    else {
      this.setGuestRole();
    }
  }

  /**
   * Logs the user out
   */
  logout(): void {
    this.roleService.flushRoles();
    this.setGuestRole();
    localStorage.removeItem('role');
    this.router.navigateByUrl('/');
  }
}
