import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../Company/Company.service';
import { ABCJobsService } from '../ABCJobs.service';
import { Project } from '../../Company/Project';
import { Location } from '@angular/common';

interface LolState {
  prueba1: string;
}

@Component({
  selector: 'app-Asignacion',
  templateUrl: './Asignacion.component.html',
  styleUrls: ['./Asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  estado: any;
  resp: any;
  perfilProy: any;
  perfilId: number = 1;
  token: string = "";
  userId: number = 0;
  proyId: number = 0;
  perfilProyId: number = 0;
  fecha_inicio: string ='';
  lstCandidatos!: any; //Array<Candidato> = [];
  lstCandidatos2!: any; //Array<Candidato> = [];
  error: boolean = false;
  longitud: number = 1000;
  p!: Project;
  lstHabils=[];
  cadHT: string = "";
  cadHB: string = "";
  cadHP: string = "";
  prueba1: string = 'Inicial';
  nomCand: string = '';
  idCand: number = 0;

  constructor(private toastr: ToastrService,
    private abcService: ABCJobsService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private location: Location,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

  ngOnInit() {
    console.log(this.location.getState())
    this.estado=this.location.getState()
    this.prueba1=(this.estado as LolState).prueba1

    this.userId=Number(sessionStorage.getItem("idUser"))
    this.token=sessionStorage.getItem("token")!
    if (!this.userId || !this.token){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      if (!parseInt(this.router.snapshot.params['perfilProyId'])) {
        this.showError("Faltan datos Necesarios, por favor intentelo nuevamente.")
      }
      else {
        this.perfilProyId = parseInt(this.router.snapshot.params['perfilProyId'])
        this.verProyectoPerfilDetalle(this.perfilProyId)
        
      }
    }
  }

  verProyectoPerfilDetalle(perfilProyId: number){
    this.abcService.verProyectoPerfilDetalle(perfilProyId).subscribe(resp => {
      this.resp=resp
      this.perfilProy=this.resp["Perfil"]
      this.nomCand=this.perfilProy.candidato
      this.idCand=this.perfilProy.id_cand
      this.fecha_inicio=this.perfilProy.fecha_inicio
      console.log("RESPUESTA")
      console.log(resp)
      console.log("perfilProy")
      console.log(this.perfilProy)
      console.log("idPerfil")
      console.log(this.perfilProy.id_perfil)
      this.perfilId=this.perfilProy.id_perfil
      this.obtenerHabilidadesPerfil(this.perfilProy.id_perfil)
    },
    error => {
      this.error = true
    })
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

  asignaCandidatoPerfilProyecto(perfilProyId: number, id_cand: number, fecha_inicio: string){
    this.abcService.asignaCandidatoPerfilProyecto(perfilProyId, id_cand, fecha_inicio).subscribe(resp => {
      console.info("The PerfilProject was updated: ", resp)
      if (this.locale=="en-US"){
        this.toastr.success("Confirmation", 'Successfully updated PerfilProject.')
      }
      else if(this.locale=="es"){
        this.toastr.success("Confirmacion", 'PerfilProjecto actualizado exitosamente.')
      }
      else{
        this.toastr.success("Confirmation", 'Successfully updated PerfilProject.')
      }
    },
    error => {
      this.error = true
    })
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

  regresar(){
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${ this.userId}/${this.token}`] )
  }

  volverAtras(){
    this.enrutador.navigate([`/asignaPuesto`] )
  }

  actualizar(){
    this.asignaCandidatoPerfilProyecto(this.perfilProyId, this.idCand, this.fecha_inicio)
  }

  receiveNombre($event: string) {
    this.nomCand = $event;
  }

  receiveId($event: number){
    this.idCand = $event;
  }

  actualizaPerfil(){
    this.perfilId=308
    console.log("actualizaPerfil()")
    console.log(this.perfilId)
  }

}
