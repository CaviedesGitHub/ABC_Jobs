/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyEntrevistasComponent } from './Company-Entrevistas.component';

describe('CompanyEntrevistasComponent', () => {
  let component: CompanyEntrevistasComponent;
  let fixture: ComponentFixture<CompanyEntrevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEntrevistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
