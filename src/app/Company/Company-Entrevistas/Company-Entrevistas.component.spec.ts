/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyEntrevistasComponent } from './Company-Entrevistas.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('CompanyEntrevistasComponent', () => {
  let component: CompanyEntrevistasComponent;
  let fixture: ComponentFixture<CompanyEntrevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, ToastrModule.forRoot(), RouterTestingModule, HttpClientModule, HttpClientTestingModule],
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
