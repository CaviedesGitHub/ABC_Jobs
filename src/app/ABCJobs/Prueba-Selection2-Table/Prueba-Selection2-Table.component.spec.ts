/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PruebaSelection2TableComponent } from './Prueba-Selection2-Table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

describe('PruebaSelection2TableComponent', () => {
  let component: PruebaSelection2TableComponent;
  let fixture: ComponentFixture<PruebaSelection2TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, HttpClientTestingModule, RouterTestingModule, MatTableModule, MatSortModule,
        MatCardModule, MatFormFieldModule, MatPaginatorModule, ToastrModule.forRoot(),],
      declarations: [ PruebaSelection2TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaSelection2TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
