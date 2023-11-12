import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './Company.component';
import { CompanyCrearComponent } from './Company-crear/Company-crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyVerComponent } from './Company-ver/Company-ver.component';
import { ProyectoVerComponent } from './Proyecto-ver/Proyecto-ver.component';
import { RouterModule } from '@angular/router';
import { PerfilAgregarComponent } from './Perfil-agregar/Perfil-agregar.component';
import { PerfilEmpComponent } from './Perfil-emp/Perfil-emp.component';
import { ProyectoCrearComponent } from './Proyecto-crear/Proyecto-crear.component';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, FormsModule, 
    MatTableModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatMenuModule, MatButtonModule
  ],
  declarations: [CompanyComponent, CompanyCrearComponent, 
    CompanyVerComponent, ProyectoVerComponent, 
    PerfilAgregarComponent, PerfilEmpComponent,
    ProyectoCrearComponent
  ],
  exports: [CompanyComponent, CompanyCrearComponent, 
    CompanyVerComponent, ProyectoVerComponent,
    PerfilAgregarComponent, PerfilEmpComponent,
    ProyectoCrearComponent
  ]
})
export class CompanyModule { }
