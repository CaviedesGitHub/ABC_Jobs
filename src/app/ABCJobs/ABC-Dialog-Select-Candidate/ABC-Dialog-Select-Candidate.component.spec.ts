/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCDialogSelectCandidateComponent } from './ABC-Dialog-Select-Candidate.component';

describe('ABCDialogSelectCandidateComponent', () => {
  let component: ABCDialogSelectCandidateComponent;
  let fixture: ComponentFixture<ABCDialogSelectCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABCDialogSelectCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCDialogSelectCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
