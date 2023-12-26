import { Component, Input, Inject, LOCALE_ID, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../Company/Company.service';
import { Candidate } from '../../Candidate/Candidate';
import { Project } from '../../Company/Project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export enum SelectType {
  single,
  multiple
}

@Component({
  selector: 'app-Detail-Match',
  templateUrl: './Detail-Match.component.html',
  styleUrls: ['./Detail-Match.component.css']
})
export class DetailMatchComponent implements OnInit {
  @Input() idPerfil!: number;
  perfilId: number = 1;
  token: string = "";
  userId: number = 0;
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

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  @Output() nombreEvent = new EventEmitter<string>();
  @Output() idEvent = new EventEmitter<number>();

  ngAfterViewInit() {
    this.lstCandidatos2.paginator = this.paginator;
    this.lstCandidatos2.sort = this.sort;
  }

  constructor(private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { 
      this.selection = new SelectionModel<any>(false, []);
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

  ngOnInit() {
    this.verCandidatosCumplen(this.idPerfil)
    //this.obtenerHabilidadesPerfil(this.idPerfil)
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  } 

  volverAnterior(){
    //this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
  }

  displayedColumns2: string[] = ['select', 'apellidos', 'nombres', 'Calificacion', 'email', 'phone', 'direccion', 'ciudad', 'id_cand', 'star'];
  //displayedColumns2: string[] = ['apellidos', 'star'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstCandidatos2.filter = filterValue.trim().toLowerCase();

    if (this.lstCandidatos2.paginator) {
      this.lstCandidatos2.paginator.firstPage();
    }
  }

  regresar(){
    this.enrutador.navigate([`/detalleProyecto/${this.proyId}/${ this.userId}/${this.token}`] )
  }

  filaClic(fila: any){
    console.log("FILA CLIC")
    this.selection.toggle(fila)
    console.log(this.selection)
    if (this.selection.selected.length==0) {
      this.nombreEvent.emit("NO ASIGNADO");
      this.idEvent.emit(0);
    }
    else{
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
      this.nombreEvent.emit("NO ASIGNADO");
      this.idEvent.emit(0);
    }
    else{
      this.nombreEvent.emit(this.selection.selected[0].nombres+' '+this.selection.selected[0].apellidos);
      this.idEvent.emit(this.selection.selected[0].id_cand);
    }
  }

  onChange(typeValue: number) {
    this.displayType = typeValue;
    this.selection.clear();
  }

}
