import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../Company/Company.service';
import { Project } from '../../Company/Project';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Eval } from '../Eval';

interface LolState {
  anno: string;
  mes: string;
  strmes: string;
  id_cand: string;
}

@Component({
  selector: 'app-Company-Eval',
  templateUrl: './Company-Eval.component.html',
  styleUrls: ['./Company-Eval.component.css']
})
export class CompanyEvalComponent implements OnInit {
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
  anno: number = 0;
  mes: number = 0;
  strmes: string = '';

  evalForm!: FormGroup;
  valores = ['Excelente', 'Buena', 'Regular', 'Mala'];

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private location: Location,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

  ngOnInit() {
    console.log(this.location.getState())
    this.estado=this.location.getState()
    if (this.estado) {
      this.anno=Number((this.estado as LolState).anno)
      this.mes=Number((this.estado as LolState).mes)
      this.strmes=(this.estado as LolState).strmes
      this.idCand=Number((this.estado as LolState).id_cand)  
    }
    
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

    this.evalForm = this.formBuilder.group({
      id_cand: [this.idCand, Validators.required],
      idPerfilProy: [this.perfilProyId, Validators.required],
      year: [this.anno, Validators.required],
      strmonth: [this.strmes, Validators.required],
      month: [this.mes, Validators.required],
      valuation: [, Validators.required],
      note: [, [Validators.required, Validators.maxLength(254)]]
    })
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

  createEvaluation(evaluation: Eval){
    this.companyService.createEval(evaluation).subscribe(resp=>{
       console.info("The evaluation was created: ", resp)
       this.toastr.success("Confirmation", "Evaluation created")
       this.evalForm.reset();
       this.enrutador.navigate(['/listaCalificacion/'+`${this.perfilProyId}`])  
    })
  }

  cancelCreation(){
    this.evalForm.reset();
    this.evalForm.controls['year'].setValue(this.anno)
    this.evalForm.controls['strmonth'].setValue(this.strmes)
    this.evalForm.controls['month'].setValue(this.mes) 
    this.evalForm.controls['id_cand'].setValue(this.idCand)
    this.evalForm.controls['idPerfilProy'].setValue(this.perfilProyId)
    this.enrutador.navigate(['/listaCalificacion/'+`${this.perfilProyId}`]) 
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
