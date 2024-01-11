import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ABCJobsComponent } from './ABCJobs.component';
import { PerfilConsultaCumplenComponent } from './Perfil-ConsultaCumplen/Perfil-ConsultaCumplen.component';
import { ListaCumplenPerfilComponent } from './Lista-CumplenPerfil/Lista-CumplenPerfil.component';
import { PageConstructionComponent } from './Page-construction/Page-construction.component';
import { AsignaPuestoComponent } from './Asigna-puesto/Asigna-puesto.component';
import { AsignacionComponent } from './Asignacion/Asignacion.component';
import { PruebaComponent } from './prueba/prueba.component';
import { DetailMatchComponent } from './Detail-Match/Detail-Match.component';
import { PruebaSelectionTableComponent } from './Prueba-Selection-Table/Prueba-Selection-Table.component';
import { PruebaSelection2TableComponent } from './Prueba-Selection2-Table/Prueba-Selection2-Table.component';
import { PruebaExpansionTableComponent } from './Prueba-Expansion-Table/Prueba-Expansion-Table.component';
import { DetailMatchPruebaComponent } from './Detail-Match-Prueba/Detail-Match-Prueba.component';
import { ABCEntrevistasPuestoComponent } from './ABC-Entrevistas-Puesto/ABC-Entrevistas-Puesto.component';
import { ABCEntrevistasCrearComponent } from './ABC-Entrevistas-Crear/ABC-Entrevistas-Crear.component';
import { ABCEntrevistasResultadoComponent } from './ABC-Entrevistas-Resultado/ABC-Entrevistas-Resultado.component';
import { ABCEntrevistasVerResultadoComponent } from './ABC-Entrevistas-Ver-Resultado/ABC-Entrevistas-Ver-Resultado.component';
import { ABCEntrevistasComponent } from './ABC-Entrevistas/ABC-Entrevistas.component';
import { ABCCandidatosComponent } from './ABC-Candidatos/ABC-Candidatos.component';
import { ABCEmpresasComponent } from './ABC-Empresas/ABC-Empresas.component';
import { ABCDialogSelectSkillComponent } from './ABC-Dialog-Select-Skill/ABC-Dialog-Select-Skill.component';
import { ABCExamenesComponent } from './ABC-Examenes/ABC-Examenes.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ABCDialogConfirmationComponent } from './ABC-Dialog-Confirmation/ABC-Dialog-Confirmation.component';
import { ABCDialogInputNumComponent } from './ABC-Dialog-Input-Num/ABC-Dialog-Input-Num.component';
import { ABCDialogSelectCandidateComponent } from './ABC-Dialog-Select-Candidate/ABC-Dialog-Select-Candidate.component';
import { ABCExamenesNuevoComponent } from './ABC-Examenes-Nuevo/ABC-Examenes-Nuevo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatRippleModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ABCJobsComponent, 
    PerfilConsultaCumplenComponent, 
    PruebaComponent,
    ListaCumplenPerfilComponent, 
    PageConstructionComponent,
    AsignaPuestoComponent,
    AsignacionComponent,
    DetailMatchComponent,
    PruebaSelectionTableComponent,
    PruebaSelection2TableComponent,
    PruebaExpansionTableComponent,
    DetailMatchPruebaComponent,
    ABCEntrevistasPuestoComponent,
    ABCEntrevistasCrearComponent,
    ABCEntrevistasResultadoComponent,
    ABCEntrevistasVerResultadoComponent,
    ABCEntrevistasComponent,
    ABCCandidatosComponent,
    ABCEmpresasComponent,
    ABCDialogSelectSkillComponent,
    ABCDialogConfirmationComponent,
    ABCExamenesComponent,
    ABCDialogInputNumComponent,
    ABCDialogSelectCandidateComponent,
    ABCExamenesNuevoComponent,
  ],
  exports: [ABCJobsComponent, 
    PerfilConsultaCumplenComponent, 
    PruebaComponent,
    ListaCumplenPerfilComponent, 
    PageConstructionComponent,
    AsignaPuestoComponent,
    AsignacionComponent,
    DetailMatchComponent,
    PruebaSelectionTableComponent,
    PruebaSelection2TableComponent,
    PruebaExpansionTableComponent,
    DetailMatchPruebaComponent,
    ABCEntrevistasPuestoComponent,
    ABCEntrevistasCrearComponent,
    ABCEntrevistasResultadoComponent,
    ABCEntrevistasVerResultadoComponent,
    ABCEntrevistasComponent,
    ABCCandidatosComponent,
    ABCEmpresasComponent,
    ABCDialogSelectSkillComponent,
    ABCDialogConfirmationComponent,
    ABCExamenesComponent,
    ABCDialogInputNumComponent,
    ABCDialogSelectCandidateComponent,
    ABCExamenesNuevoComponent,
  ],
  providers: [
    DatePipe
  ],
})
export class ABCJobsModule { }
