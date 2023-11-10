import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClsListaHabils } from '../clsListaHabils';
import { ABCJobsService } from '../ABCJobs.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Candidato } from '../../Company/Candidato';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';


interface LolState {
  lstHabils: string[];
  lstHT: string[];
  lstHB: string[];
  lstHP: string[];
}

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
  selector: 'app-Lista-CumplenPerfil',
  templateUrl: './Lista-CumplenPerfil.component.html',
  styleUrls: ['./Lista-CumplenPerfil.component.css']
})
export class ListaCumplenPerfilComponent implements OnInit {
  estado: any;
  clsListaHabils!: ClsListaHabils;
  lstCandidatos: any = []; //Array<Candidato> = [];
  error: boolean = false;
  lstHT: any[] =[];
  lstHB: string[] =[];
  lstHP: string[] =[];
  cadHT: string = "TECHNICAL SKILLS: ";
  cadHB: string = "SOFT SKILLS: ";
  cadHP: string = "PERSONAL SKILLS: ";

  displayedColumns = [
    'name',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  dataSource = ELEMENT_DATA; 
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.lstCandidatos.paginator = this.paginator;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private abcjobsService: ABCJobsService,
    private toastr: ToastrService,
    ) {
      
     }

  ngOnInit() {
    console.log(this.location.getState())
    this.estado=this.location.getState()
    this.clsListaHabils=new ClsListaHabils(this.estado['lstHabils'])
    this.lstHT=(this.estado as LolState).lstHT
    this.lstHB=(this.estado as LolState).lstHB
    this.lstHP=(this.estado as LolState).lstHP
    for (let i=0; i<this.lstHT?.length; i=i+1){
      if (i==this.lstHT?.length-1){
        this.cadHT=this.cadHT.concat(this.lstHT[i])  
      }
      else{
        this.cadHT=this.cadHT.concat(this.lstHT[i], ", ")
      }
    }
    for (let i=0; i<this.lstHB?.length; i=i+1){
      if (i==this.lstHB?.length-1){
        this.cadHB=this.cadHB.concat(this.lstHB[i])  
      }
      else{
        this.cadHB=this.cadHB.concat(this.lstHB[i], ", ")
      }
    }
    for (let i=0; i<this.lstHP?.length; i=i+1){
      if (i==this.lstHP?.length-1){
        this.cadHP=this.cadHP.concat(this.lstHP[i])  
      }
      else{
        this.cadHP=this.cadHP.concat(this.lstHP[i], ", ")
      }
    }
    this.verCandidatosCumplenporLista(this.clsListaHabils)
  }

  verCandidatosCumplenporLista(clsListaHabils: ClsListaHabils){
    this.abcjobsService.verCandidatosCumplenporLista(clsListaHabils).subscribe(resp=>{
      console.log(resp)
      this.toastr.success("Confirmation", 'Consulta Done')
      this.lstCandidatos=new MatTableDataSource(resp['Seleccion']);
      this.lstCandidatos.paginator = this.paginator;
      this.lstCandidatos.sort = this.sort;
    },
    error => {
      this.error = true
    }
    )
  }

  displayedColumns2: string[] = ['apellidos', 'nombres', 'Calificacion', 'email', 'phone', 'direccion', 'ciudad', 'id', 'star'];
  //dataSource = new MatTableDataSource<Habil>(this.lstHabilsData);
  //selection = new SelectionModel<Habil>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstCandidatos.filter = filterValue.trim().toLowerCase();

    if (this.lstCandidatos.paginator) {
      this.lstCandidatos.paginator.firstPage();
    }
  }

  regresar(){
    this.router.navigate([`/seleccionHabilidades`] )
  }
}
