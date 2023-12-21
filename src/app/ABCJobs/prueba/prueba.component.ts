import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Puesto } from '../Puesto';
import { ABCJobsService } from '../ABCJobs.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit, AfterViewInit {
  @ViewChild('fEmpresa', {static: true}) inputEmp: ElementRef | undefined;
  @ViewChild('fProyecto', {static: true}) inputProy: ElementRef | undefined;
  @ViewChild('fPerfil', {static: true}) inputPerf: ElementRef | undefined;
  @ViewChild('fCandidato', {static: true}) inputCand: ElementRef | undefined;

  textoEmpresa: string = '';
  textoProyecto: string = '';
  textoPerfil: string = '';
  textoCandidato: string = '';
  
  value = 'Clear me';

  ngOnInit() {
  }

  displayedColumns: string[] = ['nom_empresa', 'nom_proyecto', 'nom_perfil', 'candidato', 'id', 'id_perfil', 'id_cand'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: any = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private abcjobsService: ABCJobsService, private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true; 
          return this.abcjobsService.getPuestos(
            30, 
            this.paginator.pageIndex+1, 
            "ASC", 
            this.textoEmpresa, 
            this.textoProyecto, 
            this.textoPerfil,
            this.textoCandidato
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          console.log("Inicio")
          console.log(data)
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalCount;
          console.log("data.Puestos")
          console.log(data)
          return data.Puestos;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  asignaTextoEmpresa(event: Event){
    this.textoEmpresa=(event.target as HTMLInputElement).value
  }

  asignaTextoProyecto(event: Event){
    this.textoProyecto=(event.target as HTMLInputElement).value
  }

  asignaTextoPerfil(event: Event){
    this.textoPerfil=(event.target as HTMLInputElement).value
  }

  asignaTextoCandidato(event: Event){
    this.textoCandidato=(event.target as HTMLInputElement).value
  }

  updateConsulta(){
    this.paginator.pageIndex = 0
    this.ngAfterViewInit()
    console.log("Actualiza Consulta")
  }

}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}