import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../Company.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Company-Jobs',
  templateUrl: './Company-Jobs.component.html',
  styleUrls: ['./Company-Jobs.component.css']
})
export class CompanyJobsComponent implements OnInit, AfterViewInit {

  textoEmpresa: string = '';
  textoProyecto: string = '';
  textoPerfil: string = '';
  textoCandidato: string = '';
  
  proyId: number | undefined;
  token: string | undefined;
  userId: number | undefined;
  companyId: number | undefined;

  displayedColumns: string[] = ['num', 'nom_proyecto', 'nom_perfil', 'candidato', 'star'];
  data: any = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
     private dp:DatePipe,
     private companyService: CompanyService,
     private toastr: ToastrService,
     private router: ActivatedRoute,
     private enrutador: Router,
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
    this.companyId=Number(sessionStorage.getItem("idCompany"))  //Number(str) parseInt(str) parseFloat(str)
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
          return this.companyService.getPuestos(this.companyId!,
            30, 
            this.paginator.pageIndex+1, 
            "ASC", 
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

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

}
