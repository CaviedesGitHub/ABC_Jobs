/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCExamenesComponent } from './ABC-Examenes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ABCExamenesComponent', () => {
  let component: ABCExamenesComponent;
  let fixture: ComponentFixture<ABCExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe, MatProgressSpinnerModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(),],
      declarations: [ ABCExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
