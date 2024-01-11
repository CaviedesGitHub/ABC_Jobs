import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habil } from './Habil';
import { Observable } from 'rxjs';
import { ClsListaHabils } from './clsListaHabils';
import { environment } from 'src/environments/environment';
import { Puesto } from './Puesto';
import { Entrevista } from './Entrevista';
import { Examen } from '../Candidate/Examen';

@Injectable({
  providedIn: 'root'
})
export class ABCJobsService {
  private apiUrl = environment.baseUrl;
  //private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://gateway.eba-brqkktps.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Habil[]> {
    return this.http.get<Habil[]>(this.apiUrl+'/perfiles/lstHabilidades');
  }

  verCandidatosCumplenporLista(clsLstHabils: ClsListaHabils): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/cumplenPerfilporLista', clsLstHabils)
  }

  getPuestos(max: number, num_pag: number, order: string, empresa: string, proyecto: string, perfil: string, candidato: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/empresas/puestos', {"max": max, "num_pag": num_pag, "order": order, "empresa": empresa, "proyecto": proyecto, "perfil": perfil, "candidato": candidato})
  }

  getEntrevistas(max: number, num_pag: number, order: string, empresa: string, proyecto: string, perfil: string, candidato: string, fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/entrevistasPortal', {"max": max, "num_pag": num_pag, "order": order, "empresa": empresa, "proyecto": proyecto, "perfil": perfil, "candidato": candidato, "inicio":fechaInicio, "fin": fechaFin})
  }

  getCandidatos(max: number, num_pag: number, order: string, apellidos: string, nombres: string, ciudad: string, fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/candidatos/parcial', {"max": max, "num_pag": num_pag, "order": order, "apellidos": apellidos, "nombres":nombres, "ciudad": ciudad, "inicio": fechaInicio, "fin": fechaFin})
  }

  verProyectoPerfilDetalle(id_ProyPerfil: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/empresas/proyectos/perfiles/'+`${id_ProyPerfil}`)
  }

  asignaCandidatoPerfilProyecto(id_ProyPerfil: number, id_cand: number, fecha_inicio: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/empresas/proyectos/perfiles/asignacion/'+`${id_ProyPerfil}`, {"id_cand": id_cand, "fecha_inicio":fecha_inicio})
  }

  getEVJob(id_ProyPerfil: number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/empresas/proyectos/perfiles/entrevistas/'+`${id_ProyPerfil}`)
  }

  createEntrevista(ev: Entrevista):Observable<Entrevista>{
    return this.http.post<Entrevista>(this.apiUrl+'/empresas/proyectos/perfiles/entrevistas', ev);
  }

  getEntrevista(entrevistaId: number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/entrevistas/'+`${entrevistaId}`);
  }

  updateEntrevista(ev: any, entrevistaId: number):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/entrevistas/'+`${entrevistaId}`, ev);
  }
  
  createExamen(examen: Examen):Observable<Examen>{
    return this.http.post<Examen>(this.apiUrl+'/pruebas', examen);
  }  

  getTestsCandidate(id_cand: number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/pruebasCandidato/'+`${id_cand}`);
  }

  getExamenes(max: number, num_pag: number, order: string, candidato: string, habilidad: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/pruebasParam', {"max": max, "num_pag": num_pag, "order": order, "candidato": candidato, "habilidad":habilidad});
  }

  updateTestValue(id_examen: number, valor: number): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/pruebasCalificacion/'+`${id_examen}`, {"nota": valor});
  }
}



