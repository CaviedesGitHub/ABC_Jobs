import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './Candidate.component';
import { CandidateViewComponent } from './Candidate-view/Candidate-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CandidateComponent, CandidateViewComponent],
  exports: [CandidateComponent, CandidateViewComponent],
})
export class CandidateModule { }
