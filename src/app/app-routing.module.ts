import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login/Login.component';
import { SignUpComponent } from './Auth/SignUp/SignUp.component';
import { AuthComponent } from './Auth/Auth.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent },
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