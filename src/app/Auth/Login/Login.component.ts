import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../Auth.service';
import { Login } from '../Login';
import { Router } from '@angular/router';
//import { CompanyDetail } from './...src/app/Company/Company-detail';
//import { Candidate } from './...src/app/Candidate/Candidate';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: boolean = false;
  helper = new JwtHelperService();
  //company!: CompanyDetail;
  //candidate!: Candidate;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,) { }

  loginUser(login: Login){
    this.error = false
    this.authService.userLogIn(login).subscribe(res => {
      //console.info("The Login Created: ", res.id)
      //this.toastr.success("Confirmation", 'Login'+res.tipo)
      //this.loginForm.reset();
      //const decodedToken = this.helper.decodeToken(res.token);
      console.log('MENSAJE LOG CONSOLE')
      console.log(res)
      console.log('FIN MENSAJE LOG CONSOLE')
      //console.log(decodedToken.sub)
      //if (res.tipo=='EMPRESA'){
      //  if (res.hasOwnProperty('empresa')){
      //    console.log(res.empresa)
      //    this.company=res.empresa
      //    if (JSON.stringify(this.company) === '{}'){
      //      this.router.navigate([`/empresa/${decodedToken.sub}/${res.token}`])  
      //    }        
      //    else {
      //      this.router.navigate([`/detalleEmpresa/${decodedToken.sub}/${res.token}`])
      //    }
      //  }
      //  else {
      //    this.router.navigate([`/empresa/${decodedToken.sub}/${res.token}`])  
      //  }
      //}
      //else if (res.tipo=='CANDIDATO'){
      //  if (res.hasOwnProperty('candidato')){
      //    console.log(res.candidato)
      //    this.candidate=res.candidato
      //    if (JSON.stringify(this.candidate) === '{}'){
      //      this.router.navigate([`/candidato/${decodedToken.sub}/${res.token}`])  
      //    }        
      //    else {
      //      this.router.navigate([`/detalleCandidato/${decodedToken.sub}/${res.token}`])
      //    }
      //  }
      //  else {
      //    this.router.navigate([`/candidato/${decodedToken.sub}/${res.token}`])  
      //  }
      //}    
      //else{

      //}            
      },
      error => {
        this.error = true
        console.log('MENSAJE LOG CONSOLE')
        //console.log(res)
        console.log('FIN MENSAJE LOG CONSOLE')
      }
    )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(20)]],
      password: ["", Validators.required]
    })
  }

}
