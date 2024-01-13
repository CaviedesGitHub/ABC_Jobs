import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ABCJobsService } from '../ABCJobs.service';
import { Project } from '../../Company/Project';
import { Location } from '@angular/common';
import { CompanyService } from '../../Company/Company.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Entrevista } from '../Entrevista';
import { DatePipe } from '@angular/common';

interface LolState {
  prueba1: string;
}

@Component({
  selector: 'app-ABC-Entrevistas-Crear',
  templateUrl: './ABC-Entrevistas-Crear.component.html',
  styleUrls: ['./ABC-Entrevistas-Crear.component.css']
})
export class ABCEntrevistasCrearComponent implements OnInit {
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
  zona: string =''
  lstEvals: any;
  lstEV: any;
  displayedColumns: string[] = ['candidato', 'cuando', 'contacto', 'calificacion', 'anotaciones', 'star'];
  anno: number = 0;
  mes: number =0;
  strmes: string = '';
  date_fecha_asig : any;

  evForm!: FormGroup;

  fechaMin: Date | undefined;
  fechaMax: Date | undefined;
  fechaStrMin: string = '';
  fechaStrMax: string | undefined;

  minDT: Date | undefined;
  minDTutc: Date | undefined;
  maxDT: Date | undefined;
  minStrDT: string = '';
  maxStrDT: string | undefined;

  horaMinInt: number = 6;
  minsMinInt: number = 0;
  horaMaxInt: number = 21;
  minsMaxInt: number = 40;

  horaMin: string = '06:00';
  horaMax: string = '21:40';
  
  seleccionaCandidato: boolean = false;

  constructor(private toastr: ToastrService,
    private dp: DatePipe,
    private abcService: ABCJobsService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private location: Location,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

  ngOnInit() {
    console.log("new Date()")
    console.log(new Date())
    console.log("new Date().getTimezoneOffset()")
    console.log(new Date().getTimezoneOffset())
    //let timeZone;
    //if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
    //  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //  console.log({ timeZone });
    //}
    
    //let lang="en";
    //let ff=new Intl.DateTimeFormat(lang, {
    //  timeZone: timeZone,
    //  day: "2-digit",
    //  month: "2-digit",
    //  year: "numeric",
    //  weekday: "long",
    //  hour: "2-digit",
    //  minute: "2-digit",
    //  hour12: false,
    //  second: "2-digit",
    //  timeZoneName: "short",
    //}).format(new Date());
    //console.log("ff ff")
    //console.log(ff)
    //console.log("ff.toString()")
    //console.log(ff.toString())
    //let fecha1Str=ff.toString()
    //const dateSplit = fecha1Str.split(" ");
    //const timezoneAbbr = dateSplit[dateSplit.length - 1];
    //console.log("timezoneAbbr")
    //console.log(timezoneAbbr)

    console.log("new Date()")
    console.log(new Date())
    console.log("new Date().toLocaleString()")
    console.log(new Date().toLocaleString())
    console.log("new Date().toISOString()")
    console.log(new Date().toISOString())
    console.log("new Date().toLocaleString()")
    console.log(new Date().toString())
    let fechaStr2=new Date().toString()
    const dateSplit2 = fechaStr2.split(" ");
    const timezoneAbbr2 = dateSplit2[5];
    console.log("timezoneAbbr2")
    console.log(timezoneAbbr2)
    this.zona=timezoneAbbr2

    

    this.fechaMin=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1)
    this.fechaMax=new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate())
    this.fechaStrMin=this.dp.transform(this.fechaMin, "yyyy-MM-dd")!
    this.fechaStrMax=this.dp.transform(this.fechaMax, "yyyy-MM-dd")!    

    this.minDT=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1,
                        6, 0)
    this.minDTutc=new Date(new Date().getUTCFullYear(), 
                        new Date().getUTCMonth(), 
                        new Date().getUTCDate(),
                        new Date().getUTCHours(),
                        new Date().getUTCMinutes())
    console.log("minDT")
    console.log(this.minDT)
    console.log("minDTutc")
    console.log(this.minDTutc)
    this.maxDT=new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(),
                        21, 40)
    this.minStrDT=this.dp.transform(this.minDT, "yyyy-MM-ddTHH:mm")!
    this.maxStrDT=this.dp.transform(this.maxDT, "yyyy-MM-ddTHH:mm")!   
    console.log("minStrDT")
    console.log(this.minStrDT)
    console.log("maxStrDT")
    console.log(this.maxStrDT)

    this.horaMin="06:00" 
    this.horaMax="21:40" 

    console.log(this.location.getState())
    this.estado=this.location.getState()
    //this.prueba1=(this.estado as LolState).prueba1

    this.userId=Number(sessionStorage.getItem("idUser"))
    this.token=sessionStorage.getItem("token")!
    if (!this.userId || !this.token){
      console.log("IF")
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      console.log("ELSE")
      if (!parseInt(this.router.snapshot.params['perfilProyId'])) {
        this.showError("Faltan datos Necesarios, por favor intentelo nuevamente.")
      }
      else {
        this.perfilProyId = parseInt(this.router.snapshot.params['perfilProyId'])
        this.verProyectoPerfilDetalle(this.perfilProyId)
      }
    }

    //cuando: [, [Validators.required, validadoresEspeciales.validaFechaHora]],
    this.evForm = this.formBuilder.group({
      id_cand: [, Validators.required],
      candidato: ['NO ASIGNADO', Validators.required],
      fecha: [, [Validators.required, validadoresEspeciales.validarFechas]],
      hora: [, [Validators.required, validadoresEspeciales.validaHora]],
      zona: [, Validators.required],
      contacto: ["", Validators.required],
      perfilProyId: [this.perfilProyId, Validators.required]
    })

  }

  verProyectoPerfilDetalle(perfilProyId: number){
    this.companyService.verProyectoPerfilDetalle(perfilProyId).subscribe(resp => {
      this.resp=resp
      this.perfilProy=this.resp["Perfil"]
      this.nomCand="NO ASIGNADO" //this.perfilProy.candidato
      this.idCand=0 //this.perfilProy.id_cand
      this.fecha_inicio=this.perfilProy.fecha_inicio
      console.log("RESPUESTA")
      console.log(resp)
      console.log("perfilProy")
      console.log(this.perfilProy)
      console.log("idPerfil")
      //console.log(this.perfilProy.id_perfil)
      this.perfilId=this.perfilProy.id_perfil
      //this.obtenerlistaEVProyectoPerfil(this.perfilProy.id)
      this.obtenerHabilidadesPerfil(this.perfilProy.id_perfil)

      console.log("PUNTO VISION")
      console.log(this.perfilProy)
      //console.log(this.perfilProy!.contacto_empresa)
      this.evForm.controls['contacto'].setValue(this.perfilProy.contacto_empresa)
      this.evForm.controls['perfilProyId'].setValue(this.perfilProy.id)
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

  createEntrevista(ev: Entrevista){
    this.abcService.createEntrevista(ev).subscribe(resp=>{
       console.info("The evaluation was created: ", resp)
       this.toastr.success("Confirmation", "Evaluation created")
       this.evForm.reset();
       this.enrutador.navigate(['/entrevistas/'+`${this.perfilProyId}`])  
    })
  }

  cancelCreation(){
    console.log("EVFORM")
    console.log(this.evForm)
    this.evForm.reset();
    //this.evForm.controls['year'].setValue(this.anno)
    //this.evForm.controls['strmonth'].setValue(this.strmes)
    //this.evForm.controls['month'].setValue(this.mes) 
    //this.evForm.controls['id_cand'].setValue(this.idCand)
    //this.evForm.controls['idPerfilProy'].setValue(this.perfilProyId)
    this.enrutador.navigate(['/entrevistas/'+`${this.perfilProyId}`]) 
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

class validadoresEspeciales{
  public static validaHora(elemento: FormControl){
    console.log('VALIDADOR HORA')
    let invalido : boolean = false;

    let texto=elemento.value
    if (texto==null){
      return null;
    }
    console.log('texto')
    console.log(texto)
    let division1=texto.split(' ',2)
    console.log('division1')
    console.log(division1)
    let division2=division1[0].split(':',2)
    console.log('division2')
    console.log(division2)
    let horaSel=Number(division2[0])
    let minsSel=Number(division2[1])
    console.log('horaSel')
    console.log(horaSel)
    console.log('minsSel')
    console.log(minsSel)
    let validezLimInf=((horaSel<6) || (horaSel==6 && minsSel<0))
    let validezLimSup=((horaSel>21) || (horaSel==21 && minsSel>40))
    invalido=validezLimInf || validezLimSup
    
    console.log('INVALIDO')
    console.log(invalido)
    return invalido ? ({"Invalid Time": true}) : null;
  }

  public static validaFechaHora(elemento: FormControl){
    console.log('VALIDADOR FECHAHORA')
    let invalido : boolean = false;

    let texto=elemento.value
    if (texto==null){
       return null;
    }
    let aux: Date = new Date(texto)
    let fechaSeleccionada: Date = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate(), aux.getHours(), aux.getMinutes())
    console.log('texto')
    console.log(texto)
    console.log('AUX')
    console.log(aux)
    console.log('FECHA SELECCIONADA')
    console.log(fechaSeleccionada)
    console.log('MINIMA')
    console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 6, 0))
    console.log('MAXIMA')
    console.log(new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), 21, 40))
    console.log('FECHASEL > MAXIMA')
    console.log(fechaSeleccionada > new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), 21, 40))
    console.log('FECHASEL < MINIMA>')
    console.log(fechaSeleccionada < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 6, 0))
    invalido = (fechaSeleccionada > new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), 21, 40)) ||
               (fechaSeleccionada < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, 6, 0))
    console.log('INVALIDO')
    console.log(invalido)
    return invalido ? ({"Invalid DateTime": true}) : null;
 }

  public static validarFechas(elemento: FormControl){
     console.log('VALIDADOR FECHA')
     let invalido : boolean = false;

     let texto=elemento.value
     if (texto==null){
        return null;
     }
     let aux: Date = new Date(texto)
     let fechaSeleccionada: Date = new Date(aux.getUTCFullYear(), aux.getUTCMonth(), aux.getUTCDate())
     console.log('texto')
     console.log(texto)
     console.log('AUX')
     console.log(aux)
     console.log('FECHA SELECCIONADA')
     console.log(fechaSeleccionada)
     console.log('MINIMA')
     console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1))
     console.log('MAXIMA')
     console.log(new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate()))
     console.log('FECHASEL > MAXIMA')
     console.log(fechaSeleccionada > new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate()))
     console.log('FECHASEL < MINIMA>')
     console.log(fechaSeleccionada < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1))
     invalido = (fechaSeleccionada > new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate())) ||
                (fechaSeleccionada < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1))
     console.log('INVALIDO')
     console.log(invalido)
     return invalido ? ({"Invalid Date": true}) : null;

  }
}