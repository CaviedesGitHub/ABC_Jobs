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

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, FormsModule
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
