import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CompanyService } from '../Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Project } from '../Project';
import { DatePipe } from '@angular/common';

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
    private dp: DatePipe,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private enrutador: Router,
    @Inject(LOCALE_ID) public locale: string,) { }

    fechaMin: Date | undefined;
    fechaMax: Date | undefined;
    fechaStrMin: string = '';
    fechaStrMax: string | undefined;

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
    this.fechaMin=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    this.fechaMax=new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate())
    this.fechaStrMin=this.dp.transform(this.fechaMin, "yyyy-MM-dd")!
    this.fechaStrMax=this.dp.transform(this.fechaMax, "yyyy-MM-dd")!
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
      fecha_inicio: [, [Validators.required, validadoresEspeciales.validarFechas]],
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

class validadoresEspeciales{
  public static validarFechas(elemento: FormControl){
     let invalido : boolean = false;

     let texto=elemento.value
     let aux: Date = new Date(texto)
     let fechaSeleccionada: Date = new Date(aux.getUTCFullYear(), aux.getUTCMonth(), aux.getUTCDate())
     invalido = (fechaSeleccionada >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) &&
                (fechaSeleccionada < new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate()))
     return !invalido ? ({"Invalid Date": true}) : null;

  }
}