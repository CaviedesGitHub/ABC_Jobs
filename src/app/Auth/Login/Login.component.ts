import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../Auth.service';
import { Login } from '../Login';
import { Router } from '@angular/router';
import { CompanyDetail } from '../../Company/Company-detail';
import { Candidate } from '../../Candidate/Candidate';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: boolean = false;
  helper = new JwtHelperService();
  company!: CompanyDetail;
  candidate!: Candidate;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string, ) { }

  loginUser(login: Login){
    this.error = false
    this.authService.userLogIn(login).subscribe(res => {
      console.info("The Login Created: ", res.id)
      if (this.locale=="en-US"){
        this.toastr.success("Confirmation", 'Successful Login.')
      }
      else if(this.locale=="es"){
        this.toastr.success("Confirmacion", 'Ingreso Exitoso.')
      }
      else{
        this.toastr.success("Confirmation", 'Successful Login.')
      }
      this.loginForm.reset();
      const decodedToken = this.helper.decodeToken(res.token);
      console.log('MENSAJE LOG CONSOLE')
      console.log(res)
      console.log('FIN MENSAJE LOG CONSOLE')
      console.log(decodedToken.sub)
      sessionStorage.setItem("token", res.token)
      sessionStorage.setItem("idUser", String(res.id))
      sessionStorage.setItem("typeUser", res.tipo)
      if (res.tipo=='EMPRESA'){
        this.authService.setCompanyRole()
        if (res.hasOwnProperty('empresa')){
          console.log(res.empresa)
          this.company=res.empresa
          sessionStorage.setItem("idCompany", String(this.company.id))
          if (JSON.stringify(this.company) === '{}'){
            sessionStorage.setItem("creado", "NO")
            this.router.navigate([`/empresa/${decodedToken.sub}/${res.token}`])  
          }        
          else {
            sessionStorage.setItem("creado", "SI")
            this.router.navigate([`/detalleEmpresa/${decodedToken.sub}/${res.token}`])
          }
        }
        else {
          sessionStorage.setItem("creado", "NO")
          this.router.navigate([`/empresa/${decodedToken.sub}/${res.token}`])  
        }
      }
      else if (res.tipo=='CANDIDATO'){
        this.authService.setCandidateRole()
        if (res.hasOwnProperty('candidato')){
          console.log(res.candidato)
          this.candidate=res.candidato
          sessionStorage.setItem("idCandidate", String(this.candidate.id))
          if (JSON.stringify(this.candidate) === '{}'){
            sessionStorage.setItem("creado", "NO")
            this.router.navigate([`/candidato/${decodedToken.sub}/${res.token}`])  
          }        
          else {
            sessionStorage.setItem("creado", "SI")
            this.router.navigate([`/detalleCandidato/${decodedToken.sub}/${res.token}`])
          }
        }
        else {
          sessionStorage.setItem("creado", "NO")
          this.router.navigate([`/candidato/${decodedToken.sub}/${res.token}`])  
        }
      }    
      else if (res.tipo=='EMPLEADO_ABC'){
        sessionStorage.setItem("creado", "SI")
        this.authService.setEmployeeRole()
      }    
      else{
        this.authService.setGuestRole()
      }        
      },
      error => {
        this.error = true
        console.log('ERROR: MENSAJE LOG CONSOLE')
        //console.log(res)
        console.log('ERROR: FIN MENSAJE LOG CONSOLE')
      }
    )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(20)]],
      password: ["", Validators.required]
    })
    console.log("Lenguaje: ")
    console.log(this.locale)
  }

}
