import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { HttpClientModule } from '@angular/common/http';
import { CandidateComponent } from './Candidate.component';
import { CandidateService } from './Candidate.service';
import { CandidateDetail } from './Candidate-detail';
import { Candidate } from './Candidate';
import { Habilidad } from './Habilidad';
import { RouterTestingModule } from '@angular/router/testing';


describe('CandidateComponent', () => {
 let component: CandidateComponent;
 let fixture: ComponentFixture<CandidateComponent>;
 let debug: DebugElement;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientModule, RouterTestingModule],
     declarations: [ CandidateComponent ],
     providers: [ CandidateService ]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(CandidateComponent);
   component = fixture.componentInstance;

   component.candidate=new CandidateDetail(1, 'Luis Eduardo', 'Padilla Caviedes',
   'Mz 8', 'caviedes72@hotmail.com', '3054419334',
   '', 1, 1, '', []); 
   component.candidate.lstHabils.push(new Habilidad(1, 1, 100, 'BAJO', 1, 'Python', 'Tecnica'))
   component.candidate.lstHabils.push(new Habilidad(2, 1, 100, 'BAJO', 2, 'Angular', 'Tecnica'))


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