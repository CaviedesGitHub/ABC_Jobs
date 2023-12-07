import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from './Auth/Auth.service';
//import {registerLocaleData} from '@angular/common';
//import localeEs from '@angular/common/locales/es';


//registerLocaleData(localeEs, 'es');

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
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.start();
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
}
