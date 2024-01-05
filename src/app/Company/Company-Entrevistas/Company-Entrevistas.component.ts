import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../Company.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Company } from '../Company';

@Component({
  selector: 'app-Company-Entrevistas',
  templateUrl: './Company-Entrevistas.component.html',
  styleUrls: ['./Company-Entrevistas.component.css']
})
export class CompanyEntrevistasComponent implements OnInit, AfterViewInit {
  textoEmpresa: string = '';
  textoProyecto: string = '';
  textoPerfil: string = '';
  textoCandidato: string = '';
  textoRango: string = '';
  textoInicio: string = '';
  textoFin: string = '';
  
  proyId: number | undefined;
  token: string | undefined;
  userId: number | undefined;
  companyId: number | undefined;

  company!: Company;

  displayedColumns: string[] = ['num', 'candidato', 'cuando', 'contacto', 'nom_proyecto', 'nom_perfil', 'star'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: any = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private companyService: CompanyService,
     private toastr: ToastrService,
     private router: ActivatedRoute,
     private enrutador: Router,
     @Inject(LOCALE_ID) public locale: string, ) {}

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
    this.companyId=Number(sessionStorage.getItem("idCompany"))  //Number(str) parseInt(str) parseFloat(str)
    this.getCompany(this.companyId)
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
          return this.companyService.getEntrevistas(this.companyId!,
            30, 
            this.paginator.pageIndex+1, 
            "ASC", 
            this.textoProyecto, 
            this.textoPerfil,
            this.textoCandidato,
            this.textoInicio,
            this.textoFin
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
          console.log("data.Entrevistas")
          console.log(data)
          return data.Entrevistas;
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
  
  getCompany(id_empresa: number){
    this.companyService.getCompany(id_empresa).subscribe(company=>{
      console.info("The company was recovered: ", company)
      if (this.locale=="en-US"){
        this.toastr.success("Confirmation", 'Company data successfully recovered.')
      }
      else if(this.locale=="es"){
        this.toastr.success("Confirmacion", 'Datos de la empresa recuperados exitosamente.')
      }
      else{
        this.toastr.success("Confirmation", 'Company data successfully recovered.')
      }
      this.company=company
    })
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

  asignaTextoInicio(event: Event){
    this.textoInicio=(event.target as HTMLInputElement).value
  }

  asignaTextoFin(event: Event){
    this.textoFin=(event.target as HTMLInputElement).value
  }

  updateConsulta(){
    this.paginator.pageIndex = 0
    console.log("Rango")
    console.log(this.textoInicio)  //Fri Jan 05 2024 00:00:00 GMT-0800
    console.log(this.textoFin)     //Fri Jan 05 2024 00:00:00 GMT-0800
    const fechaInicio=new Date(this.textoInicio)
    const fechaFin=new Date(this.textoFin)
    console.log('.toDateString()')
    console.log(fechaInicio.toDateString())
    console.log('.toISOString()')
    console.log(fechaInicio.toISOString())
    console.log('.toLocaleDateString()')
    console.log(fechaInicio.toLocaleDateString())
    console.log('.toLocaleString()')
    console.log(fechaInicio.toLocaleString())
    console.log('.toUTCString()')
    console.log(fechaInicio.toUTCString())
    console.log(console.log(fechaInicio))
    console.log(console.log(fechaFin))
    
    this.ngAfterViewInit()
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