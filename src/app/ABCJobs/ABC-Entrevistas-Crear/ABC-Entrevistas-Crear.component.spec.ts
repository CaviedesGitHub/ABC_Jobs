/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasCrearComponent } from './ABC-Entrevistas-Crear.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

describe('ABCEntrevistasCrearComponent', () => {
  let component: ABCEntrevistasCrearComponent;
  let fixture: ComponentFixture<ABCEntrevistasCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe, ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule, HttpClientTestingModule],
      declarations: [ ABCEntrevistasCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCEntrevistasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
