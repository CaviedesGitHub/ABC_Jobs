/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './Auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxPermissionsAllowStubDirective, NgxPermissionsModule} from 'ngx-permissions';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions'

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPermissionsModule.forRoot()],   
      providers: [AuthService]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
