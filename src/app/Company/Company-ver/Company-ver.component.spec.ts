/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyVerComponent } from './Company-ver.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CompanyService } from '../Company.service';

describe('CompanyVerComponent', () => {
  let component: CompanyVerComponent;
  let fixture: ComponentFixture<CompanyVerComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterTestingModule, ToastrModule.forRoot(), HttpClientModule, HttpClientTestingModule],
      declarations: [ CompanyVerComponent ],
      providers:[ CompanyService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVerComponent);
    component = fixture.componentInstance;
    component.company={id: 1, nombre: 'Nombre Empresa', tipo:'Comercio', 
                       correo: 'empresa@hotmal.com', celular: '3154567890', 
                       contacto: 'Contacto1', pais: 'Pais1', ciudad: 'Ciudad1', 
                       direccion:'Cra 1 # 1-101', id_usuario: 1, is_active: true, estado: 'ACTIVO',
                       proyectos: [{id: 1, id_emp: 1, nombre: 'proyecto1', fecha_inicio: new Date(), descripcion: 'desc1'},
                       {id: 2, id_emp: 1, nombre: 'proyecto2', fecha_inicio: new Date(), descripcion: 'desc2'},
                       {id: 3, id_emp: 1, nombre: 'proyecto3', fecha_inicio: new Date(), descripcion: 'desc3'},]
                      }

    component.lstProy=[{id: 2, id_emp: 1, nombre: 'proyecto2', fecha_inicio: new Date(), descripcion: 'desc2'},
                      {id: 1, id_emp: 1, nombre: 'proyecto1', fecha_inicio: new Date(), descripcion: 'desc1'},
                      {id: 3, id_emp: 1, nombre: 'proyecto3', fecha_inicio: new Date(), descripcion: 'desc3'},
                      ]
    //component.lstProy=new MatTableDataSource(component.lstProy);               
    component.displayedColumns = ['id', 'nombre', 'fecha_inicio', 'descripcion'];  // ,star
    component.lstProy=new MatTableDataSource(component.company.proyectos);
    fixture.detectChanges();
    debug=fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component has a table', () => {
    expect(debug.query(By.css('table')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('thead')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);   
    expect(debug.query(By.css('tr')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('th')).childNodes.length).toBeGreaterThan(0);
    expect(debug.query(By.css('td')).childNodes.length).toBeGreaterThan(0);
  });

  it('Should has a td element', () => {
    const td=debug.query(By.css('td'));
    //fixture.detectChanges();
    expect(td).toBeTruthy();
    const content: HTMLElement = td.nativeElement;
    expect(content.textContent).toEqual(' 1 ');
    const lstTD=debug.queryAll(By.css('td'));
    expect(lstTD.length).toEqual(12);
    expect(Number(lstTD[0].nativeElement.textContent.trim())).toEqual(component.company!.proyectos[0].id)
    expect(lstTD[1].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[0].nombre)
    //expect(lstTD[2].nativeElement.textContent).toEqual('Luis')
    expect(lstTD[3].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[0].descripcion)

    expect(Number(lstTD[4].nativeElement.textContent.trim())).toEqual(component.company!.proyectos[1].id)
    expect(lstTD[5].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[1].nombre)
    //expect(lstTD[2].nativeElement.textContent).toEqual('Luis')
    expect(lstTD[7].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[1].descripcion)

    expect(Number(lstTD[8].nativeElement.textContent.trim())).toEqual(component.company!.proyectos[2].id)
    expect(lstTD[9].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[2].nombre)
    //expect(lstTD[2].nativeElement.textContent).toEqual('Luis')
    expect(lstTD[11].nativeElement.textContent.trim()).toEqual(component.company!.proyectos[2].descripcion)
  });

});
