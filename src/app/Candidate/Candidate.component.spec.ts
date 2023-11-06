import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { HttpClientModule } from '@angular/common/http';
import { CandidateComponent } from './Candidate.component';
import { CandidateService } from './Candidate.service';
import { CandidateDetail } from './/Candidate-detail';
import { Candidate } from './/Candidate';


describe('CandidateComponent', () => {
 let component: CandidateComponent;
 let fixture: ComponentFixture<CandidateComponent>;
 let debug: DebugElement;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientModule],
     declarations: [ CandidateComponent ],
     providers: [ CandidateService ]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(CandidateComponent);
   component = fixture.componentInstance;

   component.candidate={id: 1, nombres:'Luis Eduardo', apellidos:'Padilla Caviedes',
                        direccion: 'Mz 8', email:'caviedes72@hotmail.com', phone: '3054419334',
                        ciudad: '', num_perfil: 1, id_usuario: 1, imagen: '', 
                        lstHabils: [
                            {id_ph: 1, id_perfil: 1, valoracion: 'BAJO', calificacion: 100,
                             id_habil: 1, nombre: 'Python', tipo: 'Tecnica'},
                             {id_ph: 2, id_perfil: 1, valoracion: 'BAJO', calificacion: 100,
                             id_habil: 2, nombre: 'Angular', tipo: 'Tecnica'}
                        ]
                    }

   //component.courses = [
   //  new Course(faker.lorem.sentence(), faker.name.firstName(), faker.datatype.number())
   //]

   fixture.detectChanges();
   debug = fixture.debugElement;
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 it("Component has a table", () => {
   expect(debug.query(By.css("tbody")).childNodes.length).toBeGreaterThan(0);
 });

 it('should have an dd element ', () => {
   const dd = debug.query(By.css('dd'));
   const content: HTMLElement = dd.nativeElement;
   expect(content.textContent).toEqual(component.candidate.lstHabils[0].nombre)
 });

});