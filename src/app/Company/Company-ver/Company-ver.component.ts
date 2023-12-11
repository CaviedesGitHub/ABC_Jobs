import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CompanyService } from '../Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetail } from '../Company-detail';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Company-ver',
  templateUrl: './Company-ver.component.html',
  styleUrls: ['./Company-ver.component.css']
})

export class CompanyVerComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string, ) { }

  userId: number | undefined;
  token: string = "";
  company!: CompanyDetail;
  lstProy: any;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'star'];

  viewDetailUserCompany(userId: number){
    this.companyService.viewDetailUserCompany(userId).subscribe(company=>{
      console.info("The company was recovered: ", company)
      //this.toastr.success("Confirmation", `/${userId}`)
      if (this.locale=="en-US"){
        this.toastr.success("Confirmation", 'Company data successfully recovered.')
      }
      else if(this.locale=="es"){
        this.toastr.success("Confirmacion", 'Datos de la empresa recuperados exitosamente.')
      }
      else{
        this.toastr.success("Confirmation", 'Company data successfully recovered.')
      }
      this.company=company
      this.lstProy=new MatTableDataSource(company.proyectos);
    })
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
    this.viewDetailUserCompany(this.userId)
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lstProy.filter = filterValue.trim().toLowerCase();
  }

  agregarProyecto(){
    this.enrutador.navigate([`/agregarProyecto/${this.company.id}/${this.userId}/${this.token}`])
  }

  volverAtras(){
    
  }

}

