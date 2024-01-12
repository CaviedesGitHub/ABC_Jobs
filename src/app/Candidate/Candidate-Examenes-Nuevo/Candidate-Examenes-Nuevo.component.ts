import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild, AfterViewInit, LOCALE_ID, Inject, Output, EventEmitter } from '@angular/core';
import { CandidateService } from '../Candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { CandidateDetail } from '../Candidate-detail';
import { Examen } from '../Examen';
import { Habilidad } from '../Habilidad';
import { Habil } from 'src/app/Company/Habil';
import { ABCJobsService } from 'src/app/ABCJobs/ABCJobs.service';
import { Location } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


import { CompanyService } from '../../Company/Company.service';
import { Candidate } from '../../Candidate/Candidate';
import { Project } from '../../Company/Project';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { ABCDialogSelectSkillComponent } from '../../ABCJobs/ABC-Dialog-Select-Skill/ABC-Dialog-Select-Skill.component'
import { filter, observable, of, switchMap } from 'rxjs';

export enum SelectType {
  single,
  multiple
}

@Component({
  selector: 'app-Candidate-Examenes-Nuevo',
  templateUrl: './Candidate-Examenes-Nuevo.component.html',
  styleUrls: ['./Candidate-Examenes-Nuevo.component.css']
})
export class CandidateExamenesNuevoComponent implements OnInit, AfterViewInit {
  constructor(private _liveAnnouncer: LiveAnnouncer, 
    private _location: Location,
    private abcService: ABCJobsService,
    private companyService:CompanyService,
    private candidateService: CandidateService, 
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private enrutador: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public locale: string,) { 
      this.selection = new SelectionModel<any>(false, []);
    }

  testForm!: FormGroup;
  userId: number | undefined;
  token: string = "";
  id_cand: number | undefined;
  candidate: CandidateDetail | undefined;
  listaHabils: any;  // new MatTableDataSource(ELEMENT2_DATA);  new MatTableDataSource(ELEMENT2_DATA);   //any; //MatTableDataSource<any> | undefined; //any; //MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]); //MatTableDataSource<Habilidad> | undefined; //[{"nombre":"Python", "tipo":"tecnica"}, {"nombre":"java", "tipo":"tecnica"}]
  columnNames: string[] = ['nombre', 'tipo', 'calificacion', 'valoracion', 'star'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatSort) sort2: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  

  @Input() idPerfil!: number;
  perfilId: number = 1;
  proyId: number = 0;
  lstCandidatos!: any; //Array<Candidato> = [];
  lstCandidatos2!: any; //Array<Candidato> = [];
  error: boolean = false;
  longitud: number = 1000;
  p!: Project;
  lstHabils=[];
  cadHT: string = "TECHNICAL SKILLS: ";
  cadHB: string = "SOFT SKILLS: ";
  cadHP: string = "PERSONAL SKILLS: ";
  selection!: SelectionModel<any>;
  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple }
  ];
  displayType = SelectType.single;
  seleccionaCandidato: boolean = false
  nomCand: string =''
  nomHabil: string = '';
  tipo_usuario: string = "";

  //@ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  //@ViewChild(MatSort) sort: MatSort | null = null;

  @Output() nombreEvent = new EventEmitter<string>();
  @Output() idEvent = new EventEmitter<number>();


  lstHabilsData: any =[];
  lstHT: Array<Habil> = [];
  lstHB: Array<Habil> = [];
  lstHP: Array<Habil> = [];



  ngAfterViewInit() {
    //this.lstCandidatos2!.paginator! = this.paginator;
    //this.lstCandidatos2!.sort! = this.sort;
  }

  viewDetailUserCandidate(userId: number){
    this.candidateService.viewDetailUserCandidate(userId).subscribe(cand=>{
    console.info("The candidate was created: ", cand.nombres)
    //this.toastr.success("Confirmation", `/${userId}`+cand.nombres)
    if (this.locale=="en-US"){
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    else if(this.locale=="es"){
      this.toastr.success("Confirmacion", 'Datos del candidato recuperados exitosamente.')
    }
    else{
      this.toastr.success("Confirmation", 'Candidate data successfully retrieved.')
    }
    this.candidate=cand
    this.testForm.controls['id_cand'].setValue(this.candidate.id)
    this.listaHabils=new MatTableDataSource(this.candidate.lstHabils); //this.candidate.lstHabils; 
    this.listaHabils.sort = this.sort
    this.listaHabils.paginator = this.paginator
    })
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngAfterViewInit22() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.listaHabils.sort = this.sort
    this.listaHabils.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  
  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " ") {
      this.userId=Number(sessionStorage.getItem("idUser"))
      this.token=sessionStorage.getItem("token")!
      if (!this.userId || !this.token){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
    }
    else {
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }
    this.tipo_usuario=sessionStorage.getItem("typeUser")!
    this.id_cand=Number(sessionStorage.getItem("idCandidate"))
    this.viewDetailUserCandidate(this.userId)

    //this.verCandidatosCumplen(this.idPerfil)
    this.getSkills()

    this.testForm = this.formBuilder.group({
      id_cand: [, Validators.required],
      id_habil: [, Validators.required],
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

  seleccionaHabilidad(){
    console.log('seleccionaHabilidad')
    this.seleccionaCandidato=true
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
    //this.evForm.controls['year'].setValue(this.anno)
    //this.evForm.controls['strmonth'].setValue(this.strmes)
    //this.evForm.controls['month'].setValue(this.mes) 
    //this.evForm.controls['id_cand'].setValue(this.idCand)
    //this.evForm.controls['idPerfilProy'].setValue(this.perfilProyId)
    //this.enrutador.navigate(['/entrevistas/'+`${this.perfilProyId}`]) 
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

  volverAtras(){
    
  }

  applyFilter22(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaHabils.filter = filterValue.trim().toLowerCase();

    if (this.listaHabils.paginator) {
      this.listaHabils.paginator.firstPage();
    }
  }

  showError(error: string) {
  //this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
  //this.toastr.warning(warning, "Error de autenticación")
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
      //this.lstHabilsData=new MatTableDataSource(this.lstHabilsData);
      this.lstHabilsData.paginator = this.paginator;
      this.lstHabilsData.sort = this.sort;
    })
  }




  verCandidatosCumplen(perfilId: number){
    this.companyService.verCandidatosCumplenServ(perfilId).subscribe(lstCand=>{
      //this.toastr.success("Confirmation", 'Consulta Done')
      if (this.locale=="en-US"){
        this.cadHT = "SOFT SKILLS: ";
        this.cadHB = "HABILIDADES BLANDAS: ";
        this.cadHP = "PERSONAL SKILLS:: ";
        this.toastr.success("Confirmation", 'Consultation successfully completed.')
      }
      else if(this.locale=="es"){
        this.cadHT = "HABILIDADES TECNICAS: ";
        this.cadHB = "HABILIDADES BLANDAS: ";
        this.cadHP = "HABILIDADES PERSONALES: ";
        this.toastr.success("Confirmacion", 'Consulta realizada exitosamente.')
      }
      else{
        this.cadHT = "SOFT SKILLS: ";
        this.cadHB = "HABILIDADES BLANDAS: ";
        this.cadHP = "PERSONAL SKILLS:: ";
        this.toastr.success("Confirmation", 'Consultation successfully completed.')
      }
      this.lstCandidatos=lstCand
      //this.lstCandidatos2=new MatTableDataSource(lstCand.Respuesta.Seleccion);
      this.lstCandidatos2=lstCand.Respuesta.Seleccion
      this.lstCandidatos2=new MatTableDataSource(this.lstCandidatos2);
      this.lstCandidatos2.paginator = this.paginator;
      this.lstCandidatos2.sort = this.sort;
      console.log(this.lstCandidatos2)
    },
    error => {
      this.error = true
    }
    )
  }

  volverAnterior(){
    //this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
  }

  displayedColumns2: string[] = ['select', 'id', 'nombre', 'tipo', 'star'];
  //displayedColumns2: string[] = ['apellidos', 'star'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstHabilsData.filter = filterValue.trim().toLowerCase();

    if (this.lstHabilsData.paginator) {
      this.lstHabilsData.paginator.firstPage();
    }
  }

  regresar(){
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${ this.userId}/${this.token}`] )
  }

  filaClic(fila: any){
    console.log("FILA CLIC")
    console.log(this.selection)
    this.selection.toggle(fila)
    console.log(this.selection)
    if (this.selection?.selected.length==0) {
      this.testForm.controls['nom_habil'].setValue('')
      this.testForm.controls['id_habil'].setValue(0)
      console.log('no asignado')
      this.nombreEvent.emit("NO ASIGNADO");
      this.idEvent.emit(0);
    }
    else{
      console.log('asignado')
      this.testForm.controls['nom_habil'].setValue(this.selection.selected[0].nombre)
      this.testForm.controls['id_habil'].setValue(this.selection.selected[0].id)
      this.nombreEvent.emit(this.selection.selected[0].nombres+' '+this.selection.selected[0].apellidos);
      this.idEvent.emit(this.selection.selected[0].id_cand);
    }
  }

  selectHandler(row: any) {
    //if (this.displayType == SelectType.single) {
    if (!this.selection.isSelected(row)) {
      this.selection.clear();
    }
    //}
    this.selection.toggle(row);
    if (this.selection.selected.length==0) {
      this.testForm.controls['nom_habil'].setValue('')
      this.testForm.controls['id_habil'].setValue(0)
      console.log('no asignado')
      this.nombreEvent.emit("NO ASIGNADO");
      this.idEvent.emit(0);
    }
    else{
      console.log('asignado')
      this.testForm.controls['nom_habil'].setValue(this.selection.selected[0].nombre)
      this.testForm.controls['id_habil'].setValue(this.selection.selected[0].id)
      this.nombreEvent.emit(this.selection.selected[0].nombres+' '+this.selection.selected[0].apellidos);
      this.idEvent.emit(this.selection.selected[0].id_cand);
    }
  }

  onChange(typeValue: number) {
    this.displayType = typeValue;
    this.selection.clear();
  }
}