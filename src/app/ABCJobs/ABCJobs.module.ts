import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { MatRippleModule } from '@angular/material/core';
import { PruebaExpansionTableComponent } from './Prueba-Expansion-Table/Prueba-Expansion-Table.component';
import { DetailMatchPruebaComponent } from './Detail-Match-Prueba/Detail-Match-Prueba.component';

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
    FormsModule,
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
  ]
})
export class ABCJobsModule { }
