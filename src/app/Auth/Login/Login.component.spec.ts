/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './Login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { NgxPermissionsModule} from 'ngx-permissions';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions'
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPermissionsModule.forRoot(), ReactiveFormsModule, ToastrModule.forRoot(), HttpClientTestingModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug=fixture.debugElement;
  });

  function setFormValues(fromData: { nombre: any; password: any; }){
    component.loginForm.controls['nombre'].setValue(fromData.nombre);
    component.loginForm.controls['password'].setValue(fromData.password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Existen elementos', () => {
    let btnLogin = fixture.debugElement.query(By.css('#btnLogin'));
    expect(btnLogin).toBeTruthy();
    let h1Titulo = fixture.debugElement.query(By.css('#h1Titulo'));
    expect(h1Titulo).toBeTruthy();
    let h5SubTitulo = fixture.debugElement.query(By.css('#h5SubTitulo'));
    expect(h5SubTitulo).toBeTruthy();
    let lnkForgetPass = fixture.debugElement.query(By.css('#lnkForgetPass'));
    expect(lnkForgetPass).toBeTruthy();
    expect(debug.query(By.css('form')).childNodes.length).toBeGreaterThan(0);
    let nombre = fixture.debugElement.query(By.css('#nombre'));
    expect(nombre).toBeTruthy();
    let password = fixture.debugElement.query(By.css('#password'));
    expect(password).toBeTruthy();
    expect(debug.query(By.css('h1')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('button')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('a')).childNodes.length).toBeGreaterThan(0);
  });

  it('Estado del Form Invalido', () => {
    const data={
      nombre: '',
      password: ''
    } 
    setFormValues(data)    
    expect(component.loginForm.valid).toBeFalsy();
    fixture.detectChanges();
    let btnLogin = fixture.debugElement.query(By.css('#btnLogin'));
    expect(btnLogin.nativeElement.disabled).toBeTruthy();
  });

  it('Estado del Form Valido', () => {
    const data={
      nombre: 'Luis',
      password: '12345'
    } 
    setFormValues(data)    
    expect(component.loginForm.valid).toBeTruthy();
    fixture.detectChanges();
    
    let btnLogin = fixture.debugElement.query(By.css('#btnLogin'));
    expect(btnLogin.nativeElement.disabled).toBeFalsy();

    expect(component.loginForm.get('nombre')!.value.length).toBeGreaterThan(0);
    expect(component.loginForm.get('password')!.value.length).toBeGreaterThan(0);
  });
});
