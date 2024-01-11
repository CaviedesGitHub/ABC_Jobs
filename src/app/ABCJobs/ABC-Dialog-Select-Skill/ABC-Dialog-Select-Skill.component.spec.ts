/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCDialogSelectSkillComponent } from './ABC-Dialog-Select-Skill.component';

describe('ABCDialogSelectSkillComponent', () => {
  let component: ABCDialogSelectSkillComponent;
  let fixture: ComponentFixture<ABCDialogSelectSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABCDialogSelectSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCDialogSelectSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
