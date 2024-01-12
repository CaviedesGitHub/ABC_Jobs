/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasVerResultadoComponent } from './ABC-Entrevistas-Ver-Resultado.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

describe('ABCEntrevistasVerResultadoComponent', () => {
  let component: ABCEntrevistasVerResultadoComponent;
  let fixture: ComponentFixture<ABCEntrevistasVerResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      declarations: [ ABCEntrevistasVerResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCEntrevistasVerResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
