import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilProyecto } from '../Perfil-proyecto';
import { CompanyService } from '../Company.service';
import { Habil } from '../Habil';

@Component({
  selector: 'app-Perfil-agregar',
  templateUrl: './Perfil-agregar.component.html',
  styleUrls: ['./Perfil-agregar.component.css']
})
export class PerfilAgregarComponent implements OnInit {
  perfilForm!: FormGroup;
  lstHabilsData: Array<Habil> = [];
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

  ctrlHabils:HTMLInputElement = <HTMLInputElement>document.getElementById('lstHabils')!;
  ctrlHT:HTMLInputElement = <HTMLInputElement>document.getElementById('lstHabTec2')!;
  ctrlHB:HTMLInputElement = <HTMLInputElement>document.getElementById('lstHabBlan2')!;
  ctrlHP:HTMLInputElement = <HTMLInputElement>document.getElementById('lstHabPers2')!;

  @ViewChild('lstHT') lstHT2: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router
  ) { }

  asignaHabils(){
    alert('EY')
    this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    alert(this.selectedH);
    this.perfilForm.controls['lstHabils'].setValue(this.selectedH)
  }

  getSkills(){
    this.companyService.getSkills().subscribe(s=>{
      this.toastr.success("Confirmation", "List created")
      this.lstHabilsData=s
      for (let i=0; i < this.lstHabilsData.length; i++){
        if (this.lstHabilsData[i].tipo=="TECNICA"){
          this.lstHT.push(this.lstHabilsData[i])
        }
      }
      for (let i=0; i < this.lstHabilsData.length; i++){
        if (this.lstHabilsData[i].tipo=="BLANDA"){
          this.lstHB.push(this.lstHabilsData[i])
        }
      }
      for (let i=0; i < this.lstHabilsData.length; i++){
        if (this.lstHabilsData[i].tipo=="PERSONALIDAD"){
          this.lstHP.push(this.lstHabilsData[i])
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
    alert('Inicio')
    if (!parseInt(this.router.snapshot.params['proyId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.proyId = parseInt(this.router.snapshot.params['proyId'])
      this.token = this.router.snapshot.params['userToken']
    }

    this.perfilForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      lstHabils: ["30", [Validators.required]],
      lstHabTec: ["", [Validators.required]], 
      lstHabBlan: ["", [Validators.required]], 
      lstHabPers: ["", [Validators.required]]
    })
    this.getSkills()
    this.ctrlHT.onclick = this.asignaHabils;
    this.ctrlHB.onclick = this.asignaHabils;
    this.ctrlHP.onclick = this.asignaHabils;
  }
  
  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 


}
