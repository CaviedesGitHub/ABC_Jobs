import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login/Login.component';
import { SignUpComponent } from './Auth/SignUp/SignUp.component';
import { AuthComponent } from './Auth/Auth.component';
import { CompanyCrearComponent } from './Company/Company-crear/Company-crear.component';
import { CompanyVerComponent } from './Company/Company-ver/Company-ver.component';
import { ProyectoVerComponent } from './Company/Proyecto-ver/Proyecto-ver.component';
import { PerfilAgregarComponent } from './Company/Perfil-agregar/Perfil-agregar.component';
import { PerfilEmpComponent } from './Company/Perfil-emp/Perfil-emp.component';
import { ProyectoCrearComponent } from './Company/Proyecto-crear/Proyecto-crear.component';
import { CandidateCreateComponent } from './Candidate/Candidate-create/Candidate-create.component';
import { CandidateViewComponent } from './Candidate/Candidate-view/Candidate-view.component';
import { PerfilConsultaCumplenComponent } from './ABCJobs/Perfil-ConsultaCumplen/Perfil-ConsultaCumplen.component';
import { PruebaComponent } from './ABCJobs/prueba/prueba.component';
import { ListaCumplenPerfilComponent } from './ABCJobs/Lista-CumplenPerfil/Lista-CumplenPerfil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'empresa/:userId/:userToken', component: CompanyCrearComponent },
  { path: 'detalleEmpresa/:userId/:userToken', component: CompanyVerComponent },
  { path: 'detalleProyecto/:proyId/:userId/:userToken', component: ProyectoVerComponent },
  { path: 'agregarPerfil/:proyId/:userId/:userToken', component: PerfilAgregarComponent },
  { path: 'cumplenPerfil/:proyId/:perfilId/:userId/:userToken', component: PerfilEmpComponent },
  { path: 'agregarProyecto/:empId/:userId/:userToken', component: ProyectoCrearComponent },
  { path: 'candidato/:userId/:userToken', component: CandidateCreateComponent },
  { path: 'detalleCandidato/:userId/:userToken', component: CandidateViewComponent },
  { path: 'seleccionHabilidades', component: PerfilConsultaCumplenComponent },
  { path: 'listaCumplenPerfil', component: ListaCumplenPerfilComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//const routes: Routes = [
//  { path: '', component: Login1Component },
//  { path: 'empresa/:userId/:userToken', component: CompanyCrearComponent },
//  { path: 'detalleEmpresa/:userId/:userToken', component: CompanyVerComponent },
//  { path: 'detalleProyecto/:proyId/:userId/:userToken', component: ProyectoVerComponent },
//  { path: 'agregarPerfil/:proyId/:userToken', component: PerflAgregarComponent },
//  { path: 'cumplenPerfil/:proyId/:perfilId/:userId/:userToken', component: PerfilEmpComponent },
//  { path: 'agregarProyecto/:empId/:userId/:userToken', component: ProjectoCrearComponent },
//  { path: 'signup', component: SignUp1Component },
//  { path: 'login', component: Login1Component },
//  { path: 'candidato/:userId/:userToken', component: CandidateCreateComponent },
//  { path: 'detalleCandidato/:userId/:userToken', component: CandidateVerComponent } 
//];