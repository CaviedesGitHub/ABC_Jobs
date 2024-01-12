/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCCandidatosComponent } from './ABC-Candidatos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';

describe('ABCCandidatosComponent', () => {
  let component: ABCCandidatosComponent;
  let fixture: ComponentFixture<ABCCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(),],
      declarations: [ ABCCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
