import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CompanyComponent } from './Company.component';
import { CompanyCrearComponent } from './Company-crear/Company-crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyVerComponent } from './Company-ver/Company-ver.component';
import { ProyectoVerComponent } from './Proyecto-ver/Proyecto-ver.component';
import { RouterModule } from '@angular/router';
import { PerfilAgregarComponent } from './Perfil-agregar/Perfil-agregar.component';
import { PerfilEmpComponent } from './Perfil-emp/Perfil-emp.component';
import { ProyectoCrearComponent } from './Proyecto-crear/Proyecto-crear.component';
import { CompanyJobsComponent } from './Company-Jobs/Company-Jobs.component';
import { CompanyEvalComponent } from './Company-Eval/Company-Eval.component';

import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompanyEvalListComponent } from './Company-Eval-List/Company-Eval-List.component';


@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, FormsModule, 
    MatTableModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatMenuModule, MatButtonModule, MatCardModule, MatSortModule, MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  declarations: [CompanyComponent, CompanyCrearComponent, 
    CompanyVerComponent, ProyectoVerComponent, 
    PerfilAgregarComponent, PerfilEmpComponent,
    ProyectoCrearComponent,
    CompanyJobsComponent, CompanyEvalComponent, CompanyEvalListComponent,
  ],
  exports: [CompanyComponent, CompanyCrearComponent, 
    CompanyVerComponent, ProyectoVerComponent,
    PerfilAgregarComponent, PerfilEmpComponent,
    ProyectoCrearComponent,
    CompanyJobsComponent, CompanyEvalComponent, CompanyEvalListComponent,
  ],
})
export class CompanyModule { }
