import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ABCJobsService } from '../ABCJobs.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Examen } from '../../Candidate/Examen';
import { Habil } from 'src/app/Company/Habil';

import { MatDialog } from '@angular/material/dialog';
import { ABCDialogSelectSkillComponent } from '../ABC-Dialog-Select-Skill/ABC-Dialog-Select-Skill.component';
import { ABCDialogSelectCandidateComponent } from '../ABC-Dialog-Select-Candidate/ABC-Dialog-Select-Candidate.component';
import { filter, observable, of, switchMap } from 'rxjs';
import { SelCandidato } from '../SelCandidato';

@Component({
  selector: 'app-ABC-Examenes-Nuevo',
  templateUrl: './ABC-Examenes-Nuevo.component.html',
  styleUrls: ['./ABC-Examenes-Nuevo.component.css']
})
export class ABCExamenesNuevoComponent implements OnInit {
  signupForm!: FormGroup;
  testForm!: FormGroup;
  nomCand: string =''
  nomHabil: string = '';

  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    private toastr: ToastrService,
    private abcService: ABCJobsService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public locale: string, ){}

  
    ngOnInit() {
      this.testForm = this.formBuilder.group({
        id_cand: [, Validators.required],
        id_habil: [, Validators.required],
        nom_cand: [, Validators.required],
        nom_habil: [, Validators.required],
        nota: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        resultado: ['DESAPROBADO', Validators.required]
      })
    }

    createExamen(examen: Examen){
      this.abcService.createExamen(examen).subscribe(resp=>{
         console.info("The evaluation was created: ", resp)
         this.toastr.success("Confirmation", "Evaluation created")
         this.testForm.reset();
         this._location.back()
         //this.enrutador.navigate(['/candidatosExamenes/'+`${this.id_cand}`])  
      })
    }
  
    seleccionaCandidato(){
      console.log('seleccionaCandidato')
      this.dialog.open(ABCDialogSelectCandidateComponent, {data: this.testForm.controls['id_cand'].getRawValue()}).afterClosed().pipe(
        filter(candidato => !!candidato),
        switchMap(async (candidato) => this.asignaValoresCand(candidato))
      ).subscribe(()=>{
         //alert('Hizo Algo')
      });
    }

    asignaValoresCand(c: SelCandidato){
      this.nomCand=c.nombre
      this.testForm.controls['nom_cand'].setValue(c.nombre)
      this.testForm.controls['id_cand'].setValue(c.id)
    }

    seleccionaHabilidad(){
      console.log('seleccionaHabilidad')
      this.dialog.open(ABCDialogSelectSkillComponent, {data: this.testForm.controls['id_habil'].getRawValue()}).afterClosed().pipe(
        filter(habilidad => !!habilidad),
        switchMap(async (habilidad) => this.asignaValores(habilidad))
      ).subscribe(()=>{
         //alert('Hizo Algo')
      });
      //this.dialog.open(ABCDialogSelectSkillComponent).afterClosed().pipe()(
      //  filter(nombre => !!nombre)
      //).subscribe(()=>{
      //  alert(`El nombre es: ${this.nomHabil}`)
      //});
    }
  
    asignaValores(h: Habil){
      this.nomHabil=h.nombre
      this.testForm.controls['nom_habil'].setValue(h.nombre)
      this.testForm.controls['id_habil'].setValue(h.id)
      //this.testForm.controls['id_habil'].setValue(nombre)
    }
  
    cancelCreation(){
      console.log("cancelCreation: TESTFORM")
      console.log(this.testForm)
      this.testForm.reset();
      this._location.back()
   }
  
    muestraResultado(event: Event){
      const valor = Number((event.target as HTMLInputElement).value);
      if (valor>=0 && valor<60){
        this.testForm.controls['resultado'].setValue('DESAPROBADO')
      }
      else if (valor>=60 && valor<=100){
        this.testForm.controls['resultado'].setValue('APROBADO')
      }
      else{
        this.testForm.controls['resultado'].setValue('INDETERMINADO')
      }
    }

}
