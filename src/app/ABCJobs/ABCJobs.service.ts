import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habil } from './Habil';
import { Observable } from 'rxjs';
import { ClsListaHabils } from './clsListaHabils';
import { environment } from 'src/environments/environment';

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

}



