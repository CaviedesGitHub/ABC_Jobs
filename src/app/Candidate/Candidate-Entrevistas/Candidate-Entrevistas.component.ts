import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, AfterViewInit, LOCALE_ID, Inject } from '@angular/core';
import { CandidateService } from '../Candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { CandidateDetail } from '../Candidate-detail';
import { Habilidad } from '../Habilidad';
import { Candidate } from '../Candidate';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


export interface interHabil {
  position: number;
  id_ph: number;
  id_perfil: number;
  valoracion: string;
  calificacion: number;    
  id_habil: number;
  nombre: string;
  tipo: string;
}

const ELEMENT2_DATA: interHabil[] = [
  {position: 1, id_ph:1, id_perfil:2, valoracion:'BAJO', calificacion:80, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 2, id_ph:1, id_perfil:2, valoracion:'BAJO', calificacion:90, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 3, id_ph:1, id_perfil:2, valoracion:'MEDIO', calificacion:70, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 4, id_ph:1, id_perfil:2, valoracion:'ALTO', calificacion:80, id_habil:3, nombre:'Python', tipo:'Blanda'},
  {position: 5, id_ph:1, id_perfil:2, valoracion:'BAJO', calificacion:90, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 6, id_ph:2, id_perfil:3, valoracion:'BAJO', calificacion:70, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 7, id_ph:2, id_perfil:3, valoracion:'ALTO', calificacion:80, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 8, id_ph:2, id_perfil:3, valoracion:'BAJO', calificacion:90, id_habil:3, nombre:'Python', tipo:'Personal'},
  {position: 9, id_ph:2, id_perfil:3, valoracion:'MEDIO', calificacion:70, id_habil:3, nombre:'Python', tipo:'Tecnica'},
  {position: 10, id_ph:2, id_perfil:3, valoracion:'BAJO', calificacion:80, id_habil:3, nombre:'Python', tipo:'Tecnica'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-Candidate-Entrevistas',
  templateUrl: './Candidate-Entrevistas.component.html',
  styleUrls: ['./Candidate-Entrevistas.component.css']
})
export class CandidateEntrevistasComponent implements OnInit, AfterViewInit {
  textoEmpresa: string = '';
  textoProyecto: string = '';
  textoPerfil: string = '';
  textoCandidato: string = '';
  textoRango: string = '';
  textoInicio: string = '';
  textoFin: string = '';

  userId: number | undefined;
  id_cand: number | undefined;
  token: string = "";
  candidate!: Candidate;
  entrevistas: any;
  listaHabils: any;  // new MatTableDataSource(ELEMENT2_DATA);  new MatTableDataSource(ELEMENT2_DATA);   //any; //MatTableDataSource<any> | undefined; //any; //MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]); //MatTableDataSource<Habilidad> | undefined; //[{"nombre":"Python", "tipo":"tecnica"}, {"nombre":"java", "tipo":"tecnica"}]
  columnNames: string[] = ['cuando', 'contacto', 'nom_empresa', 'nom_proyecto', 'nom_perfil', 'star'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatSort) sort2: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  
  constructor(private _liveAnnouncer: LiveAnnouncer, private candidateService: CandidateService, 
    private router: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(LOCALE_ID) public locale: string,) { 
    }

  viewCandidate(id_cand: number){
    this.candidateService.viewCandidate(id_cand).subscribe(cand=>{
    console.info("The candidate was retrieved: ", cand.nombres)
    if (this.locale=="en-US"){
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    else if(this.locale=="es"){
      this.toastr.success("Confirmacion", 'Datos del candidato recuperados exitosamente.')
    }
    else{
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    this.candidate=cand
    })
  }

  getEntrevistas(id_cand: number){
    this.candidateService.getEntrevistas(id_cand,
            500, 
            1, 
            "ASC", 
            this.textoEmpresa, 
            this.textoProyecto, 
            this.textoPerfil,
            this.textoCandidato,
            this.textoInicio,
            this.textoFin).subscribe(resp=>{
    console.info("The Interviews was retrieved: ", resp)
    if (this.locale=="en-US"){
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    else if(this.locale=="es"){
      this.toastr.success("Confirmacion", 'Datos del candidato recuperados exitosamente.')
    }
    else{
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    this.entrevistas=resp.Entrevistas
    this.entrevistas=new MatTableDataSource(this.entrevistas); //this.candidate.lstHabils; 
    //this.listaHabils.sort = this.sort
    //this.listaHabils.paginator = this.paginator
    })
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.entrevistas.sort = this.sort
    this.entrevistas.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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
    this.id_cand=Number(sessionStorage.getItem("idCandidate")!)
    this.viewCandidate(this.id_cand)
    this.getEntrevistas(this.id_cand)
  }

  agregarHabilidad(){
    //this.enrutador.navigate([`/agregarProyecto/${this.company.id}/${this.userId}/${this.token}`])
  }

  volverAtras(){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entrevistas.filter = filterValue.trim().toLowerCase();

    if (this.entrevistas.paginator) {
      this.entrevistas.paginator.firstPage();
    }
  }

  showError(error: string) {
  //this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
  //this.toastr.warning(warning, "Error de autenticación")
  }

}