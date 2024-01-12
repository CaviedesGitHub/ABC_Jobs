/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ABCDialogSelectSkillComponent } from './ABC-Dialog-Select-Skill.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('ABCDialogSelectSkillComponent', () => {
  let component: ABCDialogSelectSkillComponent;
  let fixture: ComponentFixture<ABCDialogSelectSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MAT_DIALOG_DATA, MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(),],
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
