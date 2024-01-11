import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
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

import { MatDialog } from '@angular/material/dialog';
import { ABCDialogConfirmationComponent } from '../../ABCJobs/ABC-Dialog-Confirmation/ABC-Dialog-Confirmation.component';
import { ABCDialogInputNumComponent } from '../ABC-Dialog-Input-Num/ABC-Dialog-Input-Num.component';
import { filter, observable, of, switchMap as miSwitchMap } from 'rxjs';   //, switchMap
import { Confirmacion } from '../../Candidate/Confirmacion';

@Component({
  selector: 'app-ABC-Examenes',
  templateUrl: './ABC-Examenes.component.html',
  styleUrls: ['./ABC-Examenes.component.css']
})
export class ABCExamenesComponent implements OnInit, AfterViewInit {
  textoHabilidad: string = '';
  textoCandidato: string = '';
  
  proyId: number | undefined;
  token: string | undefined;
  userId: number | undefined;

  displayedColumns: string[] = ['num', 'candidato', 'nom_habil', 'nota', 'resultado', 'star'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: any = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  conf: Confirmacion | undefined;
  pregES: string = "Esta seguro que quiere borrar este examen?"
  explES: string = "Si borra este examen no podra ser recuperado. Esta accion es irreversible."
  pregEN: string = "Are you sure you want to delete this test?"
  explEN: string = "If you delete this test it cannot be recovered. This action is irreversible."
  respuesta: string = ""

  constructor(private abcjobsService: ABCJobsService,
     private toastr: ToastrService,
     private router: ActivatedRoute,
     private enrutador: Router,
     private dialog: MatDialog,
     @Inject(LOCALE_ID) public locale: string, ) {}

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " ") {
      this.userId=Number(sessionStorage.getItem("idUser"))
      this.token=sessionStorage.getItem("token")!
      if (!this.userId || !this.token){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
    }
    else {
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }
    //this.viewDetailUserCompany(this.userId)
    if (this.locale=="en-US"){
      this.conf=new Confirmacion(this.pregEN, this.explEN)
    }
    else if(this.locale=="es"){
      this.conf=new Confirmacion(this.pregES, this.explES)
    }
    else{
      this.conf=new Confirmacion(this.pregEN, this.explEN)
    }
  }

  ngAfterViewInit() {
    //this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    console.log('Datos')
    console.log(this.sort.active)
    console.log(this.sort.direction)
    console.log(this.paginator.pageIndex)

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true; 
          return this.abcjobsService.getExamenes(
            30, 
            this.paginator.pageIndex+1, 
            "ASC", 
            this.textoCandidato, 
            this.textoHabilidad
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
          console.log("data.Examenes")
          console.log(data)
          return data.Examenes;
        }),
      )
      .subscribe(data => {
        this.data=data
        console.info("The List Jobs was recovered: ")
        if (this.locale=="en-US"){
          this.toastr.success("Confirmation", 'List Jobs data successfully recovered.')
        }
        else if(this.locale=="es"){
          this.toastr.success("Confirmacion", 'Lista de Trabajos recuperados exitosamente.')
        }
        else{
          this.toastr.success("Confirmation", 'List Jobs data successfully recovered.')
        }
      });
  }

  asignaTextoHabilidad(event: Event){
    this.textoHabilidad=(event.target as HTMLInputElement).value
  }

  asignaTextoCandidato(event: Event){
    this.textoCandidato=(event.target as HTMLInputElement).value
  }

  updateConsulta(){
    this.paginator.pageIndex = 0
    this.ngAfterViewInit()
    console.log("Actualiza Consulta")
  }

  cambiaNota(id_examen: number){
    console.log('seleccionaHabilidad')
    this.dialog.open(ABCDialogInputNumComponent).afterClosed().pipe(
      filter(valor => !!valor),
      switchMap(valor => this.abcjobsService.updateTestValue(id_examen, valor))
    ).subscribe(()=>{
      this.ngAfterViewInit()
       //alert('Hizo Algo')
    });
  }

  confirmacionBorrar(){
    console.log("Confirmacion Borrar")
    this.dialog.open(ABCDialogConfirmationComponent, {data: this.conf}).afterClosed().pipe(
      filter(resp => !!resp),
      switchMap( async (resp) => this.accion(resp))
    ).subscribe(()=>{
       //alert('Hizo Algo')
    });
  }

  accion(r: any){
    this.respuesta=r
    if (r=="SI"){
      this.enrutador.navigate(['/construccion'])
    }
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
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