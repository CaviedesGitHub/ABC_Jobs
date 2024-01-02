import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ABCJobsService } from '../ABCJobs.service';
import { Project } from '../../Company/Project';
import { Location } from '@angular/common';
import { CompanyService } from '../../Company/Company.service';

interface LolState {
  prueba1: string;
}

@Component({
  selector: 'app-ABC-Entrevistas-Puesto',
  templateUrl: './ABC-Entrevistas-Puesto.component.html',
  styleUrls: ['./ABC-Entrevistas-Puesto.component.css']
})
export class ABCEntrevistasPuestoComponent implements OnInit {
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
  lstEvals: any;
  lstEV: any;
  displayedColumns: string[] = ['candidato', 'cuando', 'contacto', 'calificacion', 'anotaciones', 'star'];
  anno: number = 0;
  mes: number =0;
  strmes: string = '';
  date_fecha_asig : any;

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
    this.companyService.verProyectoPerfilDetalle(perfilProyId).subscribe(resp => {
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
      this.obtenerlistaEVProyectoPerfil(this.perfilProy.id)
      this.obtenerHabilidadesPerfil(this.perfilProy.id_perfil)
    },
    error => {
      this.error = true
    })
  }

  obtenerlistaEVProyectoPerfil(perfilProyId: number){
    this.abcService.getEVJob(perfilProyId).subscribe(resp => {
      this.resp=resp
      this.lstEV=this.resp["Entrevistas"]
    },
    error => {
      this.error = true
    })
  }

  obtenerlistaEvalsProyectoPerfil(perfilProyId: number){
    this.companyService.getEvaluationsJob(perfilProyId).subscribe(resp => {
      this.resp=resp
      this.lstEvals=this.resp["lstEvals"]
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

  calculoPeriodoEvaluado(){
    console.log('FECHA ASIGNACION')
    console.log(this.perfilProy.fecha_asig)
    this.date_fecha_asig=new Date(this.perfilProy.fecha_asig)
    if (this.lstEvals.length==0){
      this.anno=this.date_fecha_asig.getFullYear()
      this.mes=this.date_fecha_asig.getMonth()
    }
    else{
      this.anno=this.lstEvals[this.lstEvals.length-1].anno
      this.mes=this.lstEvals[this.lstEvals.length-1].mes
      this.mes=this.mes+1
      if (this.mes==12){
        this.mes=0
        this.anno=this.anno+1
      }
      const annoaux=this.date_fecha_asig.getFullYear()
      const mesaux=this.date_fecha_asig.getMonth()
      
      if (annoaux>this.anno || (annoaux==this.anno)&&(mesaux>=this.mes)) {
        this.anno=annoaux
        this.mes=mesaux
      }
    }
    this.strmes=this.setStrMonth(this.mes)
  }

  setStrMonth(mes: number){
    const mesesIngles=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const mesesSpanish=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return  mesesIngles[mes]
  }

  agregarEntrevista(){
    //this.enrutador.navigate([`/calificacion/${this.perfilProyId}`], { state: {anno: this.anno, mes: this.mes, strmes: this.strmes, id_cand: String(this.idCand)} } )
    this.enrutador.navigate([`/entrevistas/crear/${this.perfilProyId}`] )
  }

  //asignaCandidatoPerfilProyecto(perfilProyId: number, id_cand: number, fecha_inicio: string){
  //  this.abcService.asignaCandidatoPerfilProyecto(perfilProyId, id_cand, fecha_inicio).subscribe(resp => {
  //    console.info("The PerfilProject was updated: ", resp)
  //    if (this.locale=="en-US"){
  //      this.toastr.success("Confirmation", 'Successfully updated PerfilProject.')
  //    }
  //    else if(this.locale=="es"){
  //      this.toastr.success("Confirmacion", 'PerfilProjecto actualizado exitosamente.')
  //    }
  //    else{
  //      this.toastr.success("Confirmation", 'Successfully updated PerfilProject.')
  //    }
  //  },
  //  error => {
  //    this.error = true
  //  })
  //}

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
    //this.asignaCandidatoPerfilProyecto(this.perfilProyId, this.idCand, this.fecha_inicio)
  }

  receiveNombre($event: string) {
    this.nomCand = $event;
  }

  receiveId($event: number){
    this.idCand = $event;
  }

}
