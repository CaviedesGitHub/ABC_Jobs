/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignUpComponent } from './SignUp.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { NgxPermissionsModule} from 'ngx-permissions';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions'
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let debug: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPermissionsModule.forRoot(), ReactiveFormsModule, ToastrModule.forRoot(), HttpClientTestingModule, HttpClientModule],
      declarations: [ SignUpComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug=fixture.debugElement;
  });

  function setFormValues(fromData: { nombre: string; password: string; password2: string; tipo: string}){
    component.signupForm.controls['nombre'].setValue(fromData.nombre);
    component.signupForm.controls['password'].setValue(fromData.password);
    component.signupForm.controls['password2'].setValue(fromData.password2);
    component.signupForm.controls['tipo'].setValue(fromData.tipo);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Existen elementos', () => {
    let btnSignUp = fixture.debugElement.query(By.css('#btnSignUp'));
    expect(btnSignUp).toBeTruthy();
    let h1Titulo = fixture.debugElement.query(By.css('#h1Titulo'));
    expect(h1Titulo).toBeTruthy();
    let h5SubTitulo = fixture.debugElement.query(By.css('#h5SubTitulo'));
    expect(h5SubTitulo).toBeTruthy();
    let lnkLogin = fixture.debugElement.query(By.css('#lnkLogin'));
    expect(lnkLogin).toBeTruthy();
    expect(debug.query(By.css('form')).childNodes.length).toBeGreaterThan(0);
    let nombre = fixture.debugElement.query(By.css('#nombre'));
    expect(nombre).toBeTruthy();
    let password = fixture.debugElement.query(By.css('#password'));
    expect(password).toBeTruthy();
    let password2 = fixture.debugElement.query(By.css('#password2'));
    expect(password2).toBeTruthy();
    let tipo = fixture.debugElement.query(By.css('#tipo'));
    expect(tipo).toBeTruthy();
    expect(debug.query(By.css('h1')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('button')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('a')).childNodes.length).toBeGreaterThan(0);
  });

  it('Estado del Form Invalido', () => {
    const data={
      nombre: '',
      password: '',
      password2: '',
      tipo: '',
    } 
    setFormValues(data)    
    expect(component.signupForm.valid).toBeFalsy();
    fixture.detectChanges();
    let btnSignUp = fixture.debugElement.query(By.css('#btnSignUp'));
    expect(btnSignUp.nativeElement.disabled).toBeTruthy();
  });

  it('Estado del Form Valido', () => {
    const data={
      nombre: 'Luis',
      password: '12345',
      password2: '12345',
      tipo: 'CANDIDATO'  //CANDIDATO, EMPRESA, EMPLEADO_ABC
    } 
    setFormValues(data)    
    expect(component.signupForm.valid).toBeTruthy();
    fixture.detectChanges();
    
    let btnSignUp = fixture.debugElement.query(By.css('#btnSignUp'));
    expect(btnSignUp.nativeElement.disabled).toBeFalsy();

    expect(component.signupForm.get('nombre')!.value.length).toBeGreaterThan(0);
    expect(component.signupForm.get('password')!.value.length).toBeGreaterThan(0);
    expect(component.signupForm.get('password2')!.value.length).toBeGreaterThan(0);
    expect(component.signupForm.get('tipo')!.value.length).toBeGreaterThan(0);
  });
});
