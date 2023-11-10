import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABCJobsComponent } from './ABCJobs.component';
import { PerfilConsultaCumplenComponent } from './Perfil-ConsultaCumplen/Perfil-ConsultaCumplen.component';

import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PruebaComponent } from './prueba/prueba.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ListaCumplenPerfilComponent } from './Lista-CumplenPerfil/Lista-CumplenPerfil.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [ABCJobsComponent, 
    PerfilConsultaCumplenComponent, 
    PruebaComponent,
    ListaCumplenPerfilComponent
  ],
  exports: [ABCJobsComponent, 
    PerfilConsultaCumplenComponent, 
    PruebaComponent,
    ListaCumplenPerfilComponent
  ]
})
export class ABCJobsModule { }
