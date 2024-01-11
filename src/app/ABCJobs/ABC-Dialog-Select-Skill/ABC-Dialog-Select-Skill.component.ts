import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyService } from '../../Company/Company.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habil } from '../Habil';

export enum SelectType {
  single,
  multiple
}

@Component({
  selector: 'app-ABC-Dialog-Select-Skill',
  templateUrl: './ABC-Dialog-Select-Skill.component.html',
  styleUrls: ['./ABC-Dialog-Select-Skill.component.css']
})
export class ABCDialogSelectSkillComponent implements OnInit {
  lstHabilsData: any =[];
  selection!: SelectionModel<any>;
  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple }
  ];
  displayType = SelectType.single;
  seleccionaCandidato: boolean = false
  nomHabil: string = ''
  idHabil: number = 0
  displayedColumns: string[] = ['select', 'id', 'nombre', 'tipo', 'star'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  habilidad= new Habil(this.idHabil, this.nomHabil, 'TECNICA')


  constructor(private companyService:CompanyService,
              @Inject (MAT_DIALOG_DATA) public data: number) {
    this.selection = new SelectionModel<any>(false, []); 
  }

  ngOnInit() {
    this.getSkills()
  }

  getSkills(){
    this.companyService.getSkills().subscribe(s=>{
      //this.toastr.success("Confirmation", "List created")
      //this.lstHabilsData=s
      this.lstHabilsData=new MatTableDataSource(s);
      this.lstHabilsData.paginator = this.paginator;
      this.lstHabilsData.sort = this.sort;
      //for (let i=0; i < this.lstHabilsData.length; i++){
      //  if (this.lstHabilsData[i].tipo=="TECNICA"){
      //    this.lstHT.push(this.lstHabilsData[i])
      //  }
      //}
      //for (let i=0; i < this.lstHabilsData.length; i++){
      //  if (this.lstHabilsData[i].tipo=="BLANDA"){
      //    this.lstHB.push(this.lstHabilsData[i])
      //  }
      //}
      //for (let i=0; i < this.lstHabilsData.length; i++){
      //  if (this.lstHabilsData[i].tipo=="PERSONALIDAD"){
      //    this.lstHP.push(this.lstHabilsData[i])
      //  }
      //}
      //this.lstHabilsData=new MatTableDataSource(this.lstHabilsData);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstHabilsData.filter = filterValue.trim().toLowerCase();

    if (this.lstHabilsData.paginator) {
      this.lstHabilsData.paginator.firstPage();
    }
  }

  filaClic(fila: any){
    console.log("FILA CLIC")
    console.log(this.selection)
    this.selection.toggle(fila)
    console.log(this.selection)
    if (this.selection?.selected.length==0) {
      this.nomHabil=''
      this.idHabil=0
      this.habilidad.id=0
      this.habilidad.nombre=''
      console.log('no asignado')
    }
    else{
      console.log('asignado')
      this.nomHabil=this.selection.selected[0].nombre
      this.idHabil=this.selection.selected[0].id
      this.habilidad.id=this.selection.selected[0].id
      this.habilidad.nombre=this.selection.selected[0].nombre
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
      this.nomHabil=''
      this.idHabil=0
      this.habilidad.id=0
      this.habilidad.nombre=''
      console.log('no asignado')
    }
    else{
      console.log('asignado')
      this.nomHabil=this.selection.selected[0].nombre
      this.idHabil=this.selection.selected[0].id
      this.habilidad.id=this.selection.selected[0].id
      this.habilidad.nombre=this.selection.selected[0].nombre
    }
  }

}
