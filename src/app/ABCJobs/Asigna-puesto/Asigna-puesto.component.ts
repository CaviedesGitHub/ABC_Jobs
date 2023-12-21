import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Puesto } from '../Puesto';
import { ABCJobsService } from '../ABCJobs.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-Asigna-puesto',
  templateUrl: './Asigna-puesto.component.html',
  styleUrls: ['./Asigna-puesto.component.css']
})
export class AsignaPuestoComponent implements OnInit {
  puestos: any = []; 
  puestos2: Array<Puesto> =[];
  lstCandidatos: any = []; //Array<Candidato> = [];
  error: boolean = false;
  displayedColumns: string[] = ['nom_empresa', 'nom_proyecto', 'nom_perfil', 'candidato', 'id', 'star'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.puestos.paginator = this.paginator;
  }

  constructor(private abcjobsService: ABCJobsService,
              private toastr: ToastrService, 
              private router: Router, ) { }

  ngOnInit() {
    console.log("Inicio Puestos")
    this.obtenerPuestos()
    console.log("Fin Puestos")
  }

  obtenerPuestos(): void {
      //this.abcjobsService.obtenerPuestos().subscribe((resp) => {
      //  this.puestos2 = resp['Puestos'];
      //  console.log(resp)
      //  this.toastr.success("Confirmation", 'Consulta Done')
      //  this.puestos=new MatTableDataSource(resp['Puestos']);
      //  this.puestos.paginator = this.paginator;
      //  this.puestos.sort = this.sort;
      //},
      //error => {
      //  this.error = true
      //}
    //);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.puestos.filter = filterValue.trim().toLowerCase();

    if (this.puestos.paginator) {
      this.puestos.paginator.firstPage();
    }
  }

  regresar(){
    this.router.navigate([`/seleccionHabilidades`] )
  }
}
