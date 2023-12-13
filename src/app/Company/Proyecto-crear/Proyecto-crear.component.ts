import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CompanyService } from '../Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from '../Project';

@Component({
  selector: 'app-Proyecto-crear',
  templateUrl: './Proyecto-crear.component.html',
  styleUrls: ['./Proyecto-crear.component.css']
})
export class ProyectoCrearComponent implements OnInit {
  userId: number | undefined;
  empId: number = 0
  token: string | undefined;
  proyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

    createProject(project: Project){
      this.companyService.createProject(project, this.empId).subscribe(project=>{
        console.info("The Project was created: ", project)
        //this.toastr.success("Confirmation", "Project created")
        if (this.locale=="en-US"){
          this.toastr.success("Confirmation", 'The project was successfully created.')
        }
        else if(this.locale=="es"){
          this.toastr.success("Confirmacion", 'El proyecto fue creado exitosamente.')
        }
        else{
          this.toastr.success("Confirmation", 'The project was successfully created.')
        }
        this.proyForm.reset();
        this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
      })
    }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.empId = parseInt(this.router.snapshot.params['empId'])
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      //this.toastr.success("Confirmation", `${this.empId}`)
      //this.viewDetailProject(this.proyId)
    } 
    this.proyForm = this.formBuilder.group({
      id: [0],
      id_emp: [this.empId],
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required, Validators.maxLength(120)]]
    })
  }


  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

 
  cancelCreation(){
    this.enrutador.navigate([`/detalleEmpresa/${this.userId}/${this.token}`])
  }
}
