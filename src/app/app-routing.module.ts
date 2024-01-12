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
import { PageConstructionComponent } from './ABCJobs/Page-construction/Page-construction.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AsignaPuestoComponent } from './ABCJobs/Asigna-puesto/Asigna-puesto.component';
import { AsignacionComponent } from './ABCJobs/Asignacion/Asignacion.component';
import { PruebaSelectionTableComponent } from './ABCJobs/Prueba-Selection-Table/Prueba-Selection-Table.component';
import { PruebaSelection2TableComponent } from './ABCJobs/Prueba-Selection2-Table/Prueba-Selection2-Table.component';
import { PruebaExpansionTableComponent } from './ABCJobs/Prueba-Expansion-Table/Prueba-Expansion-Table.component';
import { CompanyJobsComponent } from './Company/Company-Jobs/Company-Jobs.component';
import { Company } from './Company/Company';
import { CompanyEvalComponent } from './Company/Company-Eval/Company-Eval.component';
import { CompanyEvalListComponent } from './Company/Company-Eval-List/Company-Eval-List.component';
import { ABCEntrevistasPuestoComponent } from './ABCJobs/ABC-Entrevistas-Puesto/ABC-Entrevistas-Puesto.component';
import { ABCEntrevistasCrearComponent } from './ABCJobs/ABC-Entrevistas-Crear/ABC-Entrevistas-Crear.component';
import { ABCEntrevistasResultadoComponent } from './ABCJobs/ABC-Entrevistas-Resultado/ABC-Entrevistas-Resultado.component';
import { ABCEntrevistasVerResultadoComponent } from './ABCJobs/ABC-Entrevistas-Ver-Resultado/ABC-Entrevistas-Ver-Resultado.component';
import { ABCEntrevistasComponent } from './ABCJobs/ABC-Entrevistas/ABC-Entrevistas.component';
import { CompanyEntrevistasComponent } from './Company/Company-Entrevistas/Company-Entrevistas.component';
import { CandidateEntrevistasComponent } from './Candidate/Candidate-Entrevistas/Candidate-Entrevistas.component';
import { ABCCandidatosComponent } from './ABCJobs/ABC-Candidatos/ABC-Candidatos.component';
import { ABCEmpresasComponent } from './ABCJobs/ABC-Empresas/ABC-Empresas.component';
import { CandidateExamenesComponent } from './Candidate/Candidate-Examenes/Candidate-Examenes.component';
import { CandidateExamenesNuevoComponent } from './Candidate/Candidate-Examenes-Nuevo/Candidate-Examenes-Nuevo.component';
import { ABCDialogSelectSkillComponent } from './ABCJobs/ABC-Dialog-Select-Skill/ABC-Dialog-Select-Skill.component';
import { ABCDialogConfirmationComponent } from './ABCJobs/ABC-Dialog-Confirmation/ABC-Dialog-Confirmation.component';
import { ABCExamenesComponent } from './ABCJobs/ABC-Examenes/ABC-Examenes.component';
import { ABCDialogInputNumComponent } from './ABCJobs/ABC-Dialog-Input-Num/ABC-Dialog-Input-Num.component';
import { ABCDialogSelectCandidateComponent } from './ABCJobs/ABC-Dialog-Select-Candidate/ABC-Dialog-Select-Candidate.component';
import { ABCExamenesNuevoComponent } from './ABCJobs/ABC-Examenes-Nuevo/ABC-Examenes-Nuevo.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'empresa/:userId/:userToken', component: CompanyCrearComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['COMPANY']
      }
    } 
  },
  { path: 'detalleEmpresa/:userId/:userToken', component: CompanyVerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['COMPANY']
      }
    } 
  },
  { path: 'detalleEmpresa', component: CompanyVerComponent },
  { path: 'detalleProyecto/:proyId/:userId/:userToken', component: ProyectoVerComponent },
  { path: 'agregarPerfil/:proyId/:userId/:userToken', component: PerfilAgregarComponent },
  { path: 'cumplenPerfil/:proyId/:perfilId/:userId/:userToken', component: PerfilEmpComponent },
  { path: 'agregarProyecto/:empId/:userId/:userToken', component: ProyectoCrearComponent },
  { path: 'candidato/:userId/:userToken', component: CandidateCreateComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CANDIDATE']
      }
    } 
  },
  { path: 'detalleCandidato/:userId/:userToken', component: CandidateViewComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CANDIDATE']
      }
    } 
  },
  { path: 'detalleCandidato', component: CandidateViewComponent },
  { path: 'seleccionHabilidades', component: PerfilConsultaCumplenComponent },
  { path: 'listaCumplenPerfil', component: ListaCumplenPerfilComponent },
  { path: 'construccion', component: PageConstructionComponent },
  { path: 'asignaPuesto', component: AsignaPuestoComponent },
  { path: 'asignacion/:perfilProyId', component: AsignacionComponent },
  { path: 'puestosEmpresa', component: CompanyJobsComponent },
  { path: 'listaCalificacion/:perfilProyId', component: CompanyEvalListComponent },
  { path: 'calificacion/:perfilProyId', component: CompanyEvalComponent },
  { path: 'entrevistas/:perfilProyId', component: ABCEntrevistasPuestoComponent },
  { path: 'entrevistas/crear/:perfilProyId', component: ABCEntrevistasCrearComponent },
  { path: 'resultadoEntrevista/:entrevistaId', component: ABCEntrevistasResultadoComponent },
  { path: 'verResultadoEntrevista/:entrevistaId', component: ABCEntrevistasVerResultadoComponent },
  { path: 'entrevistasTodas', component: ABCEntrevistasComponent },
  { path: 'entrevistasEmpresas', component: CompanyEntrevistasComponent },
  { path: 'entrevistasCandidatos', component: CandidateEntrevistasComponent },
  { path: 'candidatos', component: ABCCandidatosComponent },
  { path: 'empresas', component: ABCEmpresasComponent },
  { path: 'examenes', component: ABCExamenesComponent },
  { path: 'candidatosExamenes', component: CandidateExamenesComponent },
  { path: 'candidatosExamenesNuevo', component: CandidateExamenesNuevoComponent },
  { path: 'examenNuevo', component: ABCExamenesNuevoComponent },
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