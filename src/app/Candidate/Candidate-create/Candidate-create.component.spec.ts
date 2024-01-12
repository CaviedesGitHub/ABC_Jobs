/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CandidateCreateComponent } from './Candidate-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('CandidateCreateComponent', () => {
  let component: CandidateCreateComponent;
  let fixture: ComponentFixture<CandidateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe, ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule, HttpClientTestingModule],
      declarations: [ CandidateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
