/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerfilConsultaCumplenComponent } from './Perfil-ConsultaCumplen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

describe('PerfilConsultaCumplenComponent', () => {
  let component: PerfilConsultaCumplenComponent;
  let fixture: ComponentFixture<PerfilConsultaCumplenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatFormFieldModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [ PerfilConsultaCumplenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilConsultaCumplenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
