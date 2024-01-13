import { Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilProyecto } from '../Perfil-proyecto';
import { CompanyService } from '../Company.service';
import { Habil } from '../Habil';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-Perfil-agregar',
  templateUrl: './Perfil-agregar.component.html',
  styleUrls: ['./Perfil-agregar.component.css']
})
export class PerfilAgregarComponent implements OnInit {
  perfilForm!: FormGroup;
  //lstHabilsData: Array<Habil> = [];
  error: boolean = false;
  lstHabilsData: any =[];
  lstHT: Array<Habil> = [];
  lstHB: Array<Habil> = [];
  lstHP: Array<Habil> = [];
  selectedValue:any;
  selectedValue2:any;
  selectedHT:string="";
  selectedHB:string="";
  selectedHP:string="";
  selectedH:string="";
  userId: number =0;
  proyId: number =1;
  token: string = "";
  selection!: SelectionModel<Habil>;
  selLstH: string = "Vacio,";

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
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,
  ) { 
    this.selection = new SelectionModel<Habil>(true, []);
  }

  asignaHabils(){
    alert('EY')
    this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    alert(this.selectedH);
    this.perfilForm.controls['lstHabils'].setValue(this.selectedH)
  }

  getSkills(){
    this.companyService.getSkills().subscribe(s=>{
      //this.toastr.success("Confirmation", "List created")
      //this.lstHabilsData=s
      this.lstHabilsData=new MatTableDataSource(s);
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
    //this.toastr.success("Confirmation", this.selectedValue)
    //this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    //this.perfilForm.controls['lstHabils'].setValue(String(this.selectedH));
    //this.selectedH=this.selectedHT+','+this.selectedHB+','+this.selectedHP
    //perfil.lstHabils="5,7"
    this.companyService.createPerfil(perfil,this.proyId).subscribe(res=>{
        console.info("The Profile was created: ", res)
        //this.toastr.success("Confirmation", "Profile Created"+res)
        if (this.locale=="en-US"){
          this.toastr.success("Confirmation", 'Profile successfully created.')
        }
        else if(this.locale=="es"){
          this.toastr.success("Confirmacion", 'Perfil creado exitosamente.')
        }
        else{
          this.toastr.success("Confirmation", 'Profile successfully created.')
        }
        this.perfilForm.reset();
        this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${this.userId}/${this.token}`])
      },
      error => {
        this.error = true
        //this.toastr.error("Error", error)
        console.log("Error:")
        console.log(error)
      }
    )
  }

  cancelCreation(){
    this.perfilForm.reset();
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${this.userId}/${this.token}`])
  }


  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['proyId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.proyId = parseInt(this.router.snapshot.params['proyId'])
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }

    this.perfilForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      lstHabils: ["", [Validators.required]]
    })
    this.getSkills()
    //this.ctrlHT.onclick = this.asignaHabils;
    //this.ctrlHB.onclick = this.asignaHabils;
    //this.ctrlHP.onclick = this.asignaHabils;
  }
  
  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 

  displayedColumns: string[] = ['select', 'id', 'nombre', 'tipo'];
  //dataSource = new MatTableDataSource<Habil>(this.lstHabilsData);
  //selection = new SelectionModel<Habil>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.lstHabilsData?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.actSel();
      return;
    }

    this.selection.select(...this.lstHabilsData.data);
    this.actSel();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Habil): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstHabilsData.filter = filterValue.trim().toLowerCase();
  }

  actSel(){
    this.selLstH=""
    for (let i=0; i<this.selection.selected.length; i=i+1){
      if (i==0){
        this.selLstH=this.selLstH+String(this.selection.selected[i]['id'])  
      }
      else{
        this.selLstH=this.selLstH+','+String(this.selection.selected[i]['id'])  
      }
    }
    
    console.log(this.perfilForm.controls['nombre'].getRawValue())
    this.perfilForm.setValue({nombre:this.perfilForm.controls['nombre'].getRawValue(), lstHabils: this.selLstH})
    console.log("actSel")
    console.log(this.perfilForm)
  }

}
