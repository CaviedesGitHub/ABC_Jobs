import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Perfil-agregar',
  templateUrl: './Perfil-agregar.component.html',
  styleUrls: ['./Perfil-agregar.component.css']
})
export class PerfilAgregarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilProyecto } from '../Perfil-proyecto';
import { CompanyService } from '../Company.service';
import { Habil } from '../Habil';

@Component({
  selector: 'app-Perfl-agregar',
  templateUrl: './Perfl-agregar.component.html',
  styleUrls: ['./Perfl-agregar.component.css']
})
export class PerflAgregarComponent implements OnInit {
  perfilForm!: FormGroup;
  lstHabils: Array<Habil> = [];
  lstHT: Array<Habil> = [];
  lstHB: Array<Habil> = [];
  lstHP: Array<Habil> = [];
  selectedValue:any;
  selectedValue2:any;
  selectedHT:string="";
  selectedHB:string="";
  selectedHP:string="";
  selectedH:string="";
  proyId: number =1;
  token: string = "";

  @ViewChild('lstHT') lstHT2: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router
  ) { }

  getSkills(){
    this.companyService.getSkills().subscribe(s=>{
      this.toastr.success("Confirmation", "List created")
      this.lstHabils=s
      for (let i=0; i < this.lstHabils.length; i++){
        if (this.lstHabils[i].tipo=="TECNICA"){
          this.lstHT.push(this.lstHabils[i])
        }
      }
      for (let i=0; i < this.lstHabils.length; i++){
        if (this.lstHabils[i].tipo=="BLANDA"){
          this.lstHB.push(this.lstHabils[i])
        }
      }
      for (let i=0; i < this.lstHabils.length; i++){
        if (this.lstHabils[i].tipo=="PERSONALIDAD"){
          this.lstHP.push(this.lstHabils[i])
        }
      }
    })
  }

  //createPerfil1(perfil: PerfilProyecto){
  //  this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
  //  this.perfilForm.controls['lstHabils'].setValue(String(this.selectedH));
  //  return this.createPerfil2(perfil)  
  //}

  createPerfil(perfil: PerfilProyecto){
    this.toastr.success("Confirmation", this.selectedValue)
    //this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    //this.perfilForm.controls['lstHabils'].setValue(String(this.selectedH));
    //this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    //perfil.lstHabils="5,7"
    this.companyService.createPerfil(perfil,this.proyId).subscribe(res=>{
      console.info("The Profile was created: ", res)
      this.toastr.success("Confirmation", "Profile Created")
      this.perfilForm.reset();
      this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${this.token}`])
    })
    
  }

  cancelCreation(){
    this.perfilForm.reset();
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${this.token}`])
  }


  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.proyId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.proyId = parseInt(this.router.snapshot.params.proyId)
      this.token = this.router.snapshot.params.userToken
    }

    this.perfilForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      lstHabils: [""]
    })
    this.getSkills()
  }
  
  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 


}

