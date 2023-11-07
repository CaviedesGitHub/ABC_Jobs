import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Perfil-emp',
  templateUrl: './Perfil-emp.component.html',
  styleUrls: ['./Perfil-emp.component.css']
})
export class PerfilEmpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../Company.service';
import { Candidato } from '../Candidato';
import { Project } from '../Project';

@Component({
  selector: 'app-Perfil-emp',
  templateUrl: './Perfil-emp.component.html',
  styleUrls: ['./Perfil-emp.component.css']
})
export class PerfilEmpComponent implements OnInit {
  perfilId: number = 1;
  token: string = "";
  userId: number = 0;
  proyId: number = 0;
  lstCandidatos!: any; //Array<Candidato> = [];
  error: boolean = false;
  longitud: number = 1000;
  p!: Project;

  constructor(private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute) { }


  verCandidatosCumplen(perfilId: number){
    this.companyService.verCandidatosCumplenServ(perfilId).subscribe(lstCand=>{
      this.toastr.success("Confirmation", 'Consulta Done')
      this.lstCandidatos=lstCand
    },
    error => {
      this.error = true
    }
    )
  }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.perfilId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.proyId = parseInt(this.router.snapshot.params.proyId)
      this.perfilId = parseInt(this.router.snapshot.params.perfilId)
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.verCandidatosCumplen(this.perfilId)
    }
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

}
