/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCEntrevistasComponent } from './ABC-Entrevistas.component';

describe('ABCEntrevistasComponent', () => {
  let component: ABCEntrevistasComponent;
  let fixture: ComponentFixture<ABCEntrevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABCEntrevistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
