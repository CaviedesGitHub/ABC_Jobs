import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from './Auth/Auth.service';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ABC_Jobs';
  categories = ['Hardware', 'Computers', 'Clothing', 'Software'];
  localesList = [
    { code: "en-US", label: 'English' },
    { code: "es", label: 'Spanish' }
  ];
  
  constructor(private authService: AuthService, private enrutador: Router) { }

  ngOnInit(): void {
    this.authService.start();
    if (environment.production) {
      console.log("We are running in production mode");
      console.log(`API Key: ${environment.apiKey}`);
      console.log(`baseUrl: ${environment.baseUrl}`);
    } else {
      console.log("We are running in development mode");
      console.log(`API Key: ${environment.apiKey}`);
      console.log(`baseUrl: ${environment.baseUrl}`);
    }
    $(document).ready(function(){
      $("#BTNAbrir").on('click', function(){
        alert("Mensaje desde el boton");
      })
    });
    //$(function() {
    //  $( "p" ).text( "The DOM is now loaded and can be manipulated." );
    //  });
  }

  logout(): void {
    this.authService.logout()
  }

  goHome(){
    let tipoUsuario=sessionStorage.getItem("typeUser")
    if (!tipoUsuario){
      this.enrutador.navigate([`/`])
    }
    else{
      let token=sessionStorage.getItem("token")
      let userId=sessionStorage.getItem("idUser")
      if (tipoUsuario==="EMPRESA"){
         this.enrutador.navigate([`/detalleEmpresa/${userId}/${token}`])
      }
      else if (tipoUsuario==="CANDIDATO"){
         this.enrutador.navigate([`/detalleCandidato/${userId}/${token}`])
      }
      else{  //EMPLEADO_ABC
        this.enrutador.navigate([`/seleccionHabilidades`])
      }
    }
  }
}
