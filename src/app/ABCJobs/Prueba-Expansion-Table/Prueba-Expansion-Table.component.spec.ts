/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PruebaExpansionTableComponent } from './Prueba-Expansion-Table.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

describe('PruebaExpansionTableComponent', () => {
  let component: PruebaExpansionTableComponent;
  let fixture: ComponentFixture<PruebaExpansionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, CommonModule],
      declarations: [ PruebaExpansionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaExpansionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
