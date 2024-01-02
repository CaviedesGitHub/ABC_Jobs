import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './Company';
import { CompanyDetail } from './Company-detail';
import { ProjectDetail } from './Project-detail';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { PerfilProyecto } from './Perfil-proyecto';
import { Habil } from './Habil';
import { Project } from './Project';
import { Candidato } from './Candidato';
import { environment } from 'src/environments/environment';
import { Eval } from './Eval';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //private apiUrl = environment.baseUrl + '/empresas'
  //private apiEmpresas = 'http://empresas.eba-djxnu4ir.us-east-2.elasticbeanstalk.com/empresas'
  //private apiEmpresas = 'http://localhost:5000/empresas'
  private detalleUrl=''
 
  private apiUrl = environment.baseUrl;
  //private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://gateway.eba-brqkktps.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  createCompany(company: Company): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/empresas", company);
  }

  createPerfil(p: PerfilProyecto, proyId: number): Observable<any> {
    //this.detalleUrl='http://localhost:5000'+'/empresas/proyectos/'+`${proyId}`+'/perfilesStr'
    return this.http.post<any>(this.apiUrl+'/empresas/proyectos/'+`${proyId}`+'/perfilesStr', p);
  }

  getSkills(): Observable<Habil[]> {
    //return this.http.get<Habil[]>('http://localhost:5000'+'/perfiles/lstHabilidades');
    return this.http.get<Habil[]>(this.apiUrl+'/perfiles/lstHabilidades');
  }

  ////private apiEmpresaDetalle = 'http://empresas.eba-djxnu4ir.us-east-2.elasticbeanstalk.com/empresaUsuarioDetalle'
  //private apiEmpresaDetalle = 'http://localhost:5000/empresaUsuarioDetalle'
  viewDetailUserCompany(userId: number): Observable<CompanyDetail> {
    //this.apiEmpresaDetalle=this.apiEmpresaDetalle+`/${userId}`
    return this.http.get<CompanyDetail>(this.apiUrl+'/empresaUsuarioDetalle'+`/${userId}`);
  }

  viewDetailProject(p: Project): Observable<any> {
    //http://localhost:5000/empresas/proyectos/1/detallePerfiles
    this.detalleUrl='http://localhost:5000'+'/empresas/proyectos/'+`${p.id}`+'/detallePerfiles'
    //fija: 'http://localhost:5000/empresas/proyectos/1/detallePerfiles'
    //this.detalleUrl='http://localhost:5000/empresas/proyectos/1/detallePerfiles'
    return this.http.get<any>(this.apiUrl+'/empresas/proyectos/'+`${p.id}`+'/detallePerfiles');
  }

  verDetalle(): Observable<any> {
    //return this.http.get<any>('http://localhost:5000/empresas/proyectos/1/detallePerfiles')
    return this.http.get<any>('http://localhost:5000/empresa/1')
  }

  verCandidatosCumplenServ(id_perfil: number): Observable<any> {
    // //return this.http.get<Candidato[]>(environment.baseUrl +'/cumplenPerfil'+`/${id_perfil}`)
    //return this.http.get<any>('http://localhost:5000/cumplenPerfil'+`/${id_perfil}`)
    return this.http.get<any>(this.apiUrl+'/cumplenPerfil'+`/${id_perfil}`)
  }


  createProject(project: Project, id_empresa: number): Observable<Project> {
    //this.detalleUrl='http://localhost:5000'+'/empresas/'+`${id_empresa}`+'/proyectos'
    return this.http.post<Project>(this.apiUrl+'/empresas/'+`${id_empresa}`+'/proyectos', project);
  }

  getSkillsProfile(profileId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/perfil/'+`${profileId}`);
  }

  getPuestos(id_empresa: number, max: number, num_pag: number, order: string, proyecto: string, perfil: string, candidato: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/empresas/'+`${id_empresa}`+'/puestos', {"id_empresa": id_empresa, "max": max, "num_pag": num_pag, "order": order, "proyecto": proyecto, "perfil": perfil, "candidato": candidato})
  }

  verProyectoPerfilDetalle(id_ProyPerfil: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/empresas/proyectos/perfiles/'+`${id_ProyPerfil}`)
  }

  getEvaluationsJob(id_ProyPerfil: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/empresas/proyectos/perfiles/evaluaciones/'+`${id_ProyPerfil}`)
  }

  createEval(evaluation: Eval): Observable<Eval> {
    return this.http.post<Eval>(this.apiUrl+'/empresas/proyectos/perfiles/evaluaciones', evaluation);
  }

}
