/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasVerResultadoComponent } from './ABC-Entrevistas-Ver-Resultado.component';

describe('ABCEntrevistasVerResultadoComponent', () => {
  let component: ABCEntrevistasVerResultadoComponent;
  let fixture: ComponentFixture<ABCEntrevistasVerResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
