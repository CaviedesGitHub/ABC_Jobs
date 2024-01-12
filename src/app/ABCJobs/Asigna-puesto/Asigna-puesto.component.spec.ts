/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsignaPuestoComponent } from './Asigna-puesto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AsignaPuestoComponent', () => {
  let component: AsignaPuestoComponent;
  let fixture: ComponentFixture<AsignaPuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(),],
      declarations: [ AsignaPuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
