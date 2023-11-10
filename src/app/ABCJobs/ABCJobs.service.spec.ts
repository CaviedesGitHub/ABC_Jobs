/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ABCJobsService } from './ABCJobs.service';

describe('Service: ABCJobs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABCJobsService]
    });
  });

  it('should ...', inject([ABCJobsService], (service: ABCJobsService) => {
    expect(service).toBeTruthy();
  }));
});
