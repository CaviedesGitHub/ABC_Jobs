/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasResultadoComponent } from './ABC-Entrevistas-Resultado.component';

describe('ABCEntrevistasResultadoComponent', () => {
  let component: ABCEntrevistasResultadoComponent;
  let fixture: ComponentFixture<ABCEntrevistasResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
