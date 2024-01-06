import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CandidateComponent } from './Candidate.component';
import { CandidateViewComponent } from './Candidate-view/Candidate-view.component';
import { CandidateEntrevistasComponent } from './Candidate-Entrevistas/Candidate-Entrevistas.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CandidateCreateComponent } from './Candidate-create/Candidate-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [CandidateComponent, 
    CandidateViewComponent, 
    CandidateCreateComponent,
    CandidateEntrevistasComponent
  ],
  exports: [CandidateComponent, 
    CandidateViewComponent, 
    CandidateCreateComponent,
    CandidateEntrevistasComponent
  ],
  providers: [
    DatePipe
  ],
})
export class CandidateModule { }
