import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CandidateComponent } from './Candidate/Candidate.component';
import { CandidateViewComponent } from './Candidate/Candidate-view/Candidate-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, MatIconModule, MatButtonToggleModule,
      MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, 
      MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule,
      MatSelectModule, MatCardModule, BrowserAnimationsModule 
     ],
    declarations: [AppComponent, CandidateComponent, CandidateViewComponent, MatPaginator]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ABC_Jobs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ABC_Jobs');
  });

});
