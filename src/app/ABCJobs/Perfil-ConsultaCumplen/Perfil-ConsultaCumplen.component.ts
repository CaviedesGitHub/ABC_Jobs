import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habil } from '../Habil';
import { ToastrService } from 'ngx-toastr';
import { ABCJobsService } from '../ABCJobs.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-Perfil-ConsultaCumplen',
  templateUrl: './Perfil-ConsultaCumplen.component.html',
  styleUrls: ['./Perfil-ConsultaCumplen.component.css']
})
export class PerfilConsultaCumplenComponent implements OnInit {
  lstHabilsData: any =[]; //Array<Habil> = [];
  lstHT: Array<Habil> = [];
  lstHB: Array<Habil> = [];
  lstHP: Array<Habil> = [];
  selection!: SelectionModel<Habil>;

  constructor(
    private toastr: ToastrService,
    private abcjobsService: ABCJobsService,
    private router: Router) { 
      this.selection = new SelectionModel<Habil>(true, []);
    }

  ngOnInit() {
    //alert('Inicio Perfil-Consulta')
    this.getSkills()
    //this.selection = new SelectionModel<Habil>(true, []);
  }


  getSkills(){
    this.abcjobsService.getSkills().subscribe(s=>{
      
      //this.lstHabilsData=s
      this.lstHabilsData=new MatTableDataSource(s);
      //this.toastr.success("Confirmation", "List Consult")
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
    })
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
      return;
    }

    this.selection.select(...this.lstHabilsData.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Habil): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  buscaCandidatos(){
    //this.toastr.success("Confirmation", "Click en Boton")
    let lstHa: string ='';
    let lstHaN: number[] = [];
    let lstHaTec: string[] = [];
    let lstHaBla: string[] = [];
    let lstHaPer: string[] = [];
    //console.log(this.selection.selected)
    
    for (let i=0; i<this.selection.selected.length; i=i+1){
      console.log(this.selection.selected[i]['id'])
      lstHaN.push(this.selection.selected[i]['id'])
      if (i==0){
        lstHa=lstHa+String(this.selection.selected[i]['id'])  
      }
      else{
        lstHa=lstHa+','+String(this.selection.selected[i]['id'])  
      }
      if (this.selection.selected[i]['tipo']=='TECNICA'){
        lstHaTec.push(this.selection.selected[i]['nombre'])
      }
      else if (this.selection.selected[i]['tipo']=='BLANDA'){
        lstHaBla.push(this.selection.selected[i]['nombre'])
      }
      else if (this.selection.selected[i]['tipo']=='PERSONALIDAD'){
        lstHaPer.push(this.selection.selected[i]['nombre'])
      }
    }
    lstHaN.sort()
    console.log(lstHa)
    console.log(lstHaN)
    this.router.navigate([`/listaCumplenPerfil`], { state: {lstHabils: lstHaN, lstHT: lstHaTec, lstHB: lstHaBla, lstHP: lstHaPer} } )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstHabilsData.filter = filterValue.trim().toLowerCase();
  }
}


