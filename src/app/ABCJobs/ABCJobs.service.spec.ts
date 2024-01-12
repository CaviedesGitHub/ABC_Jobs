/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ABCJobsService } from './ABCJobs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: ABCJobs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],   
      providers: [ABCJobsService]
    });
  });

  it('should ...', inject([ABCJobsService], (service: ABCJobsService) => {
    expect(service).toBeTruthy();
  }));
});
