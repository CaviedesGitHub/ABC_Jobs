import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ABCJobsService } from '../ABCJobs.service';
import { CompanyService } from 'src/app/Company/Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-ABC-Entrevistas-Resultado',
  templateUrl: './ABC-Entrevistas-Resultado.component.html',
  styleUrls: ['./ABC-Entrevistas-Resultado.component.css']
})
export class ABCEntrevistasResultadoComponent implements OnInit {
  userId: number = 0;
  token: string = '';
  entrevistaId: number = 0;
  resp: any;
  entrevista: any;
  id_perfil: number = 0;
  perfilProyId: number = 0;
  error: boolean = false;
  lstHabils=[];
  cadHT: string = "";
  cadHB: string = "";
  cadHP: string = "";
  revForm!: FormGroup;
  
  constructor(private toastr: ToastrService,
    private abcService: ABCJobsService,
    private companyService: CompanyService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

  ngOnInit() {
    this.userId=Number(sessionStorage.getItem("idUser"))
    this.token=sessionStorage.getItem("token")!
    if (!this.userId || !this.token){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      if (!parseInt(this.router.snapshot.params['entrevistaId'])) {
        this.showError("Faltan datos Necesarios, por favor intentelo nuevamente.")
      }
      else {
        this.entrevistaId = parseInt(this.router.snapshot.params['entrevistaId'])
        this.getEntrevista(this.entrevistaId)
      }
    }
    this.revForm = this.formBuilder.group({
      calificacion: [, Validators.required],
      anotaciones: [, Validators.required],
      
    })
  }

  getEntrevista(entrevistaId: number){
    this.abcService.getEntrevista(entrevistaId).subscribe(resp => {
      this.resp=resp
      this.entrevista=this.resp["Entrevista"]
      this.id_perfil=this.entrevista.id_perfil
      this.perfilProyId=this.entrevista.id_perfilproy
      console.log("RESPUESTA")
      console.log(resp)
      console.log("Entrevista")
      console.log(this.entrevista)
      console.log("id_perfil")
      console.log(this.id_perfil)
      this.obtenerHabilidadesPerfil(this.id_perfil)
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


  updateEntrevista(ev: any, id: number){
    console.log(ev)
    this.abcService.updateEntrevista(ev, id).subscribe(resp=>{
       console.info("The interview was updated: ", resp)
       this.toastr.success("Confirmation", "Interview updated")
       this.revForm.reset();
       this.enrutador.navigate(['/entrevistas/'+`${this.perfilProyId}`]) 
    })
  }

  cancelCreation(){
    console.log("EVFORM")
    console.log(this.revForm)
    this.revForm.reset();
    //this.evForm.controls['year'].setValue(this.anno)
    //this.evForm.controls['strmonth'].setValue(this.strmes)
    //this.evForm.controls['month'].setValue(this.mes) 
    //this.evForm.controls['id_cand'].setValue(this.idCand)
    //this.evForm.controls['idPerfilProy'].setValue(this.perfilProyId)
    
    //this.enrutador.navigate(['/entrevistas/'+`${this.perfilProyId}`]) 
    this._location.back()
 }


  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 
}