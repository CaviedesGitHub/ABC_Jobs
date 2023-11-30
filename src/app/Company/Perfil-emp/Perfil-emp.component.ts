import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../Company.service';
import { Candidato } from '../Candidato';
import { Project } from '../Project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Perfil-emp',
  templateUrl: './Perfil-emp.component.html',
  styleUrls: ['./Perfil-emp.component.css']
})

export class PerfilEmpComponent implements OnInit {
  perfilId: number = 1;
  token: string = "";
  userId: number = 0;
  proyId: number = 0;
  lstCandidatos!: any; //Array<Candidato> = [];
  lstCandidatos2!: any; //Array<Candidato> = [];
  error: boolean = false;
  longitud: number = 1000;
  p!: Project;
  lstHabils=[];
  cadHT: string = "TECHNICAL SKILLS: ";
  cadHB: string = "SOFT SKILLS: ";
  cadHP: string = "PERSONAL SKILLS: ";

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.lstCandidatos2.paginator = this.paginator;
    this.lstCandidatos2.sort = this.sort;
  }

  constructor(private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,) { }


  verCandidatosCumplen(perfilId: number){
    this.companyService.verCandidatosCumplenServ(perfilId).subscribe(lstCand=>{
      this.toastr.success("Confirmation", 'Consulta Done')
      this.lstCandidatos=lstCand
      //this.lstCandidatos2=new MatTableDataSource(lstCand.Respuesta.Seleccion);
      this.lstCandidatos2=lstCand.Respuesta.Seleccion
      this.lstCandidatos2=new MatTableDataSource(this.lstCandidatos2);
      this.lstCandidatos2.paginator = this.paginator;
      this.lstCandidatos2.sort = this.sort;
      console.log(this.lstCandidatos2)
    },
    error => {
      this.error = true
    }
    )
  }

  obtenerHabilidadesPerfil(perfilId: number){
    this.companyService.getSkillsProfile(perfilId).subscribe(resp=>{
      console.log(resp)
      this.lstHabils=resp.Habilidades;
      for (let i=0; i<this.lstHabils.length; i=i+1){
        console.log(this.lstHabils[i]["nombre"])
        if (this.lstHabils[i]["cod_habil"]==1){
          this.cadHT=this.cadHT.concat(this.lstHabils[i]["nombre"], "- ")
          console.log("1: tecnica")
        }
        else if(this.lstHabils[i]["cod_habil"]==2){
          this.cadHB=this.cadHB.concat(this.lstHabils[i]["nombre"], "- ")
          console.log("2: blan")
        }
        else if(this.lstHabils[i]["cod_habil"]==3){
          this.cadHP=this.cadHP.concat(this.lstHabils[i]["nombre"], "- ")
          console.log("3: Pers")
        }
        else{
          console.log("?: Que paso")
        }
      }  
    },
    error => {
      this.error = true
    }
  )
  }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['perfilId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.proyId = parseInt(this.router.snapshot.params['proyId'])
      this.perfilId = parseInt(this.router.snapshot.params['perfilId'])
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      this.verCandidatosCumplen(this.perfilId)
      this.obtenerHabilidadesPerfil(this.perfilId)
    }
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 

  volverAnterior(){
    //this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
  }

  displayedColumns2: string[] = ['apellidos', 'nombres', 'Calificacion', 'email', 'phone', 'direccion', 'ciudad', 'id_cand', 'star'];
  //displayedColumns2: string[] = ['apellidos', 'star'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstCandidatos2.filter = filterValue.trim().toLowerCase();

    if (this.lstCandidatos2.paginator) {
      this.lstCandidatos2.paginator.firstPage();
    }
  }

  regresar(){
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${ this.userId}/${this.token}`] )
  }

}
