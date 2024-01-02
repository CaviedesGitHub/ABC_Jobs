import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Candidate } from '../Candidate';
import { CandidateService } from '../Candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Candidate-create',
  templateUrl: './Candidate-create.component.html',
  styleUrls: ['./Candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  candidateForm!: FormGroup;

  constructor(   
    private dp: DatePipe,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private candidateService: CandidateService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) 
  { }

  userId: number | undefined
  token: string | undefined
  fechaMin: Date | undefined;
  fechaMax: Date | undefined;
  fechaStrMin: string = '';
  fechaStrMax: string | undefined;

  createCandidate(candidate: Candidate){
    this.candidateService.createCandidate(candidate).subscribe(
      resp => {
        sessionStorage.setItem("creado", "SI")
        console.info("The candidate was created: ", candidate)
        //this.toastr.success("Confirmation", "Candidate created"+`${resp.nombres}`)
        if (this.locale=="en-US"){
          this.toastr.success("Confirmation", 'Candidate successfully created.')
        }
        else if(this.locale=="es"){
          this.toastr.success("Confirmacion", 'Candidato creado exitosamente.')
        }
        else{
          this.toastr.success("Confirmation", 'Candidate successfully created.')
        }
        this.candidateForm.reset();
        this.enrutador.navigate([`/detalleCandidato/${this.userId}/${this.token}`])
      }
    )
  }

  cancelCreation(){
    this.candidateForm.reset();
  }

  ngOnInit() {
    this.fechaMin=new Date(new Date().getFullYear()-60, new Date().getMonth(), new Date().getDate())
    this.fechaMax=new Date(new Date().getFullYear()-18, new Date().getMonth(), new Date().getDate())
    this.fechaStrMin=this.dp.transform(this.fechaMin, "yyyy-MM-dd")!
    this.fechaStrMax=this.dp.transform(this.fechaMax, "yyyy-MM-dd")!
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      console.log('INICIO MENDSAJE CONSOLE LOG CREAR CANDIDATO')
      console.log(this.userId)
      console.log('FIN MENDSAJE CONSOLE LOG CREAR CANDIDATO')
    }

    this.candidateForm = this.formBuilder.group({
      nombres: ["", [Validators.required, Validators.minLength(2)]],
      apellidos: ["", [Validators.required, Validators.minLength(2)]],
      documento: [, [Validators.required, Validators.minLength(2)]],
      fecha_nac: [, [Validators.required, validadoresEspeciales.validarFechas]],
      email: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.minLength(2)]],
      ciudad: ["", [Validators.required, Validators.minLength(2)]],
      direccion: ["", [Validators.required, Validators.minLength(2)]],
      id_usuario: [this.userId],
      num_perfil: [0, ],
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

}

class validadoresEspeciales{
  public static validarFechas(elemento: FormControl){
     let invalido : boolean = false;

     let texto=elemento.value
     let aux: Date = new Date(texto)
     let fechaSeleccionada: Date = new Date(aux.getUTCFullYear(), aux.getUTCMonth(), aux.getUTCDate())
     invalido = (fechaSeleccionada > new Date(new Date().getFullYear()-18, new Date().getMonth(), new Date().getDate())) || 
                (fechaSeleccionada < new Date(new Date().getFullYear()-60, new Date().getMonth(), new Date().getDate()))
     return invalido ? ({"Invalid Date": true}) : null;

  }
}