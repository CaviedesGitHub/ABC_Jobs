import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Candidate } from '../Candidate';
import { CandidateService } from '../Candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Candidate-create',
  templateUrl: './Candidate-create.component.html',
  styleUrls: ['./Candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  candidateForm!: FormGroup;

  constructor(   
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private candidateService: CandidateService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) 
  { }

  userId: number | undefined
  token: string | undefined

  createCandidate(candidate: Candidate){
    this.candidateService.createCandidate(candidate).subscribe(
      resp => {
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
      fecha_nac: [, []],
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