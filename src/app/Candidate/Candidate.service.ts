import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { Candidate } from './Candidate';
import { CandidateDetail } from './Candidate-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = environment.baseUrl;
  //private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://gateway.eba-brqkktps.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }
  
  createCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/candidatos", candidate);
  }

  viewDetailUserCandidate(userId: number): Observable<CandidateDetail> {
    return this.http.get<CandidateDetail>(this.apiUrl+'/candidatoUsuarioDetalle'+`/${userId}`);
  }

  viewCandidate(id_cand: number): Observable<Candidate> {
    return this.http.get<Candidate>(this.apiUrl+'/candidato/'+`${id_cand}`);
  }

  getEntrevistas(id_cand:number, max: number, num_pag: number, order: string, empresa: string, proyecto: string, perfil: string, candidato: string, fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/entrevistasCandidato/'+`${id_cand}`, {"max": max, "num_pag": num_pag, "order": order, "empresa":empresa, "proyecto": proyecto, "perfil": perfil, "candidato": candidato, "inicio":fechaInicio, "fin": fechaFin})
  }  

  getExamenes(id_cand:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/pruebasCandidato/'+`${id_cand}`)
  } 
}