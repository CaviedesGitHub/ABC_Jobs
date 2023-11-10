/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerfilConsultaCumplenComponent } from './Perfil-ConsultaCumplen.component';

describe('PerfilConsultaCumplenComponent', () => {
  let component: PerfilConsultaCumplenComponent;
  let fixture: ComponentFixture<PerfilConsultaCumplenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
