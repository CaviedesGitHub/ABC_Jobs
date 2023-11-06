/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpErrorInterceptorServiceService } from './HttpErrorInterceptorService.service';
import { ToastrModule } from 'ngx-toastr';

describe('Service: HttpErrorInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [HttpErrorInterceptorServiceService]
    });
  });

  it('should ...', inject([HttpErrorInterceptorServiceService], (service: HttpErrorInterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
