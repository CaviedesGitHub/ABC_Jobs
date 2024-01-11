import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Puesto } from '../Puesto';
import { ABCJobsService } from '../ABCJobs.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { SelectionModel } from '@angular/cdk/collections';
import { Habil } from '../Habil';
import { SelCandidato } from '../SelCandidato';

export enum SelectType {
  single,
  multiple
}

@Component({
  selector: 'app-ABC-Dialog-Select-Candidate',
  templateUrl: './ABC-Dialog-Select-Candidate.component.html',
  styleUrls: ['./ABC-Dialog-Select-Candidate.component.css']
})
export class ABCDialogSelectCandidateComponent implements OnInit, AfterViewInit {
  textoCiudad: string = '';
  textoEmpresa: string = '';
  textoProyecto: string = '';
  textoPerfil: string = '';

  textoApellidos: string = '';
  textoNombres: string = '';

  textoCandidato: string = '';
  textoRango: string = '';
  textoInicio: string = '';
  textoFin: string = '';
  
  proyId: number | undefined;
  token: string | undefined;
  userId: number | undefined;

  displayedColumns: string[] = ['select', 'num', 'candidato', 'documento', 'ciudad', 'email'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: any = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection!: SelectionModel<any>;
  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple }
  ];
  displayType = SelectType.single;

  nomHabil: string = ''
  idHabil: number = 0
  habilidad= new Habil(this.idHabil, this.nomHabil, 'TECNICA')

  nomCand: string = ''
  idCand: number = 0
  selCandidato= new SelCandidato(this.idCand, this.nomCand)

  constructor(private abcjobsService: ABCJobsService,
     private toastr: ToastrService,
     private router: ActivatedRoute,
     private enrutador: Router,
     @Inject(LOCALE_ID) public locale: string, ) {
      this.selection = new SelectionModel<any>(false, []); 
     }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === "") {
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
          return this.abcjobsService.getCandidatos(
            30, 
            this.paginator.pageIndex+1, 
            "ASC", 
            this.textoApellidos,
            this.textoNombres,
            "",
            "",
            ""
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
          console.log("data.Candidatos")
          console.log(data)
          return data.Candidatos;
        }),
      )
      .subscribe(data => {
        this.data=data
        console.info("The List Jobs was recovered: ")
        if (this.locale=="en-US"){
          this.toastr.success("Confirmation", 'List Interviews data successfully recovered.')
        }
        else if(this.locale=="es"){
          this.toastr.success("Confirmacion", 'Lista de Entrevistas recuperadas exitosamente.')
        }
        else{
          this.toastr.success("Confirmation", 'List Interviews data successfully recovered.')
        }
      });
  }

  filaClic(fila: any){
    console.log("FILA CLIC")
    console.log(this.selection)
    this.selection.toggle(fila)
    console.log(this.selection)
    if (this.selection?.selected.length==0) {
      this.nomCand=''
      this.idCand=0
      this.selCandidato.id=0
      this.selCandidato.nombre=''
      console.log('no asignado')
    }
    else{
      console.log('asignado')
      this.nomCand=this.selection.selected[0].candidato
      this.idCand=this.selection.selected[0].id
      this.selCandidato.id=this.selection.selected[0].id
      this.selCandidato.nombre=this.selection.selected[0].candidato
    }
  }

  selectHandler(row: any) {
    //if (this.displayType == SelectType.single) {
    if (!this.selection.isSelected(row)) {
      this.selection.clear();
    }
    //}
    this.selection.toggle(row);
    if (this.selection.selected.length==0) {
      this.nomCand=''
      this.idCand=0
      this.selCandidato.id=0
      this.selCandidato.nombre=''
      console.log('no asignado')
    }
    else{
      console.log('asignado')
      this.nomCand=this.selection.selected[0].candidato
      this.idCand=this.selection.selected[0].id
      this.selCandidato.id=this.selection.selected[0].id
      this.selCandidato.nombre=this.selection.selected[0].candidato
    }
  }

  asignaTextoCiudad(event: Event){
    this.textoCiudad=(event.target as HTMLInputElement).value
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

  asignaTextoApellidos(event: Event){
    this.textoApellidos=(event.target as HTMLInputElement).value
  }

  asignaTextoNombres(event: Event){
    this.textoNombres=(event.target as HTMLInputElement).value
  }

  asignaTextoCandidato(event: Event){
    this.textoCandidato=(event.target as HTMLInputElement).value
  }

  asignaTextoInicio(event: Event){
    this.textoInicio=(event.target as HTMLInputElement).value
  }

  asignaTextoFin(event: Event){
    this.textoFin=(event.target as HTMLInputElement).value
  }

  updateConsulta(){
    this.paginator.pageIndex = 0   
    this.ngAfterViewInit()
    this.selCandidato.id=0
    this.selCandidato.nombre=''
    console.log("Actualiza Consulta")
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
