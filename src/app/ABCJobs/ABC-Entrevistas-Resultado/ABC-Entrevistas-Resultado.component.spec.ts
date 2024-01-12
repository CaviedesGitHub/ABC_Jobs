/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasResultadoComponent } from './ABC-Entrevistas-Resultado.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('ABCEntrevistasResultadoComponent', () => {
  let component: ABCEntrevistasResultadoComponent;
  let fixture: ComponentFixture<ABCEntrevistasResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatFormFieldModule, RouterTestingModule, ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule, HttpClientTestingModule],
      declarations: [ ABCEntrevistasResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCEntrevistasResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
