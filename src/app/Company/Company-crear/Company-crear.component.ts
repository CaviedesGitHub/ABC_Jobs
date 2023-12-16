import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Company } from '../Company';
import { CompanyService } from '../Company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Company-crear',
  templateUrl: './Company-crear.component.html',
  styleUrls: ['./Company-crear.component.css']
})
export class CompanyCrearComponent implements OnInit {
  empresaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string, 
  ) { }

  userId: number | undefined
  token: string | undefined

  createCompany(company: Company){
    this.companyService.createCompany(company).subscribe(empresa=>{
      sessionStorage.setItem("creado", "SI")
      console.info("The company was created: ", empresa)
      //this.toastr.success("Confirmation", "Company created"+`${empresa.Empresa.id_usuario}`)
      if (this.locale=="en-US"){
        this.toastr.success("Confirmation", 'Successfully established company.')
      }
      else if(this.locale=="es"){
        this.toastr.success("Confirmacion", 'Empresa creada exitosamente.')
      }
      else{
        this.toastr.success("Confirmation", 'Successfully established company.')
      }
      this.empresaForm.reset();  //id_usuario
      this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
    })
  }

  cancelCreation(){
    this.empresaForm.reset();
    //this.enrutador.navigate([`/detalleProyecto/${this.userId}/${this.token}`])
  }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }

    this.empresaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      tipo: ["", Validators.required],
      correo: ["", Validators.required],
      celular: ["", Validators.required],
      contacto: ["", Validators.required],
      pais: ["", Validators.required],
      ciudad: ["", Validators.required],
      direccion: ["", Validators.required],
      id_usuario: [this.userId],
      is_active: [true],
      estado: ["ACTIVO"]
    })
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

}






