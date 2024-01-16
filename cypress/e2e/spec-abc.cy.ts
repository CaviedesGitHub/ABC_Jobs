import {faker} from '@faker-js/faker'

const NUM_EMPRESAS=2
const NUM_PROYECTOS=3
const NUM_PERFILES=3

let TimeStamp=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
                       new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds()).getTime().toString()
let userName='User'+TimeStamp
let userNameABC='UserABC'+TimeStamp
let userPass='12345'
let userRole='EMPRESA' //'CANDIDATE' , ABCJOBS EMPLOYEE
let companyName=''
let companyEmail=''
let Skill1=''
let Skill2=''
let Skill3=''

let lstNombresEmpresas: string[]=[]
let lstNombresProyectos: string[]=[]
let lstNombresPerfilesProy: string[]=[]

let UUIDempresa=faker.string.uuid();

let lstUUIDEmpresas: string[]=[]
let lstUUIDProyectos: string[]=[]
let lstUUIDPerfilesProy: string[]=[]

let ahora: Date;
let nombre_emp: string;
let lstPerfilesHab=[[0, 56, 80], [1, 57, 81], [2, 58, 82]]

function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

let i: number;
for (i=0; i<5; i++){
    lstUUIDEmpresas.push(faker.string.uuid())
}

for (i=0; i<3; i++){
    lstUUIDProyectos.push(faker.string.uuid())
    sleep(1000)
}


for (i=0; i<3; i++){
    lstUUIDPerfilesProy.push(faker.string.uuid())
    sleep(1000)
}

class DatosPruebaPuestos{

    inicio(){
    }
    crearDatosPrueba(){
        for (let i=0; i<NUM_EMPRESAS; i++){
            ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
                   new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())

            userName = 'User'+ahora.getTime().toString()
            const pass = userPass
            const role = userRole
            this.crearUsuario(userName, pass, role)
            this.loginUsuario(userName, pass)

            nombre_emp="Company"+UUIDempresa+ahora.getTime().toString()
            this.creaEmpresa(nombre_emp)
            lstNombresEmpresas.push(nombre_emp)

        }
    }
    crearUsuario(userName: string, pass: string, role: string){
        cy.visit('/signup')
        cy.get('[data-cy=nameSignup]').type(`${userName}`)
        cy.get('[data-cy=pass1Signup]').type(`${pass}`)
        cy.get('[data-cy=pass2Signup]').type(`${pass}`)
        cy.get('[data-cy=roleSignup]').select(role)
        cy.get('[data-cy=submitSignup]').click()
        cy.get('[data-cy=root]').within(() => {
            cy.get('#toast-container').contains('User successfully created.')
        })
    }
    loginUsuario(userName: string, pass: string){
        cy.visit('/login')
        cy.get('[data-cy=nameLogin]').type(`${userName}`)
        cy.get('[data-cy=passLogin]').type(`${pass}`)
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=root]').within(() => {
            cy.get('#toast-container').contains('Successful Login.')
            cy.get('#toast-container').children().eq(0).children().eq(0).click()
        })
    }
    creaEmpresa(nombre: string){
      const nameCompany = nombre
      companyName=nameCompany
      const type = 'Comercio'
      const email = 'Mail'+Date.now().toString()+'@correo.com'
      companyEmail=email
      const phone = faker.phone.number()
      const contact = faker.person.fullName()
      const country = faker.location.country()
      const city = faker.location.city()
      const address = faker.location.streetAddress()

      cy.url().should('include', 'empresa')  
      cy.get('[data-cy=nameCompany]').type(`${nameCompany}`)
      cy.get('[data-cy=typeCompany]').type(`${type}`)
      cy.get('[data-cy=emailCompany]').type(`${email}`)
      cy.get('[data-cy=phoneCompany]').type(`${phone}`)
      cy.get('[data-cy=contactCompany]').type(`${contact}`)
      cy.get('[data-cy=countryCompany]').type(`${country}`)
      cy.get('[data-cy=cityCompany]').type(`${city}`)
      cy.get('[data-cy=addressCompany]').type(`${address}`)
      cy.get('[data-cy=createCompany]').click()
      cy.get('[data-cy=root]').within(() => {
         cy.get('#toast-container').contains('Successfully established company.')
         cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
      let nombre_proy: string;
      for (let j=0; j<NUM_PROYECTOS; j++){
        nombre_proy=faker.company.name()+lstUUIDProyectos[j]+ahora.getTime().toString()
        this.crearProyecto(nombre_proy);
        lstNombresProyectos.push(nombre_proy)
      }

      let nombre_perfil: string;
      for (let k=0; k<NUM_PROYECTOS; k++){
        cy.get('[data-cy=lstProjCompanyView]').children().eq(1).children().eq(k).children().eq(4).children().eq(0).click({force: true})
        cy.get('[data-cy=linkDetailProject]').click({force: true})
        for (let l=0; l<NUM_PERFILES; l++){
            nombre_perfil=faker.person.jobTitle()+lstUUIDPerfilesProy[l]+ahora.getTime().toString()
            lstNombresPerfilesProy.push(nombre_perfil)
            this.crearPerfil(nombre_perfil, lstPerfilesHab[l])
        }
        cy.get('[data-cy=backProject]').click({force: true})
      }
    }

    crearProyecto(nombre: string){
      let nameProject=nombre; //faker.company.name()
      let fecha_inicio=faker.date.soon({days: 10})
      let descProject=faker.lorem.sentence()
      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('The project was successfully created.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })

      cy.get('[data-cy=lstProjCompanyView]').contains(nameProject)
      cy.get('[data-cy=lstProjCompanyView]').contains(descProject)
    }

    crearPerfil(nombre: string, lstHabils: number[]){
        cy.get('[data-cy=addProfile]').click()
        let lNameProfile=nombre
        cy.get('[data-cy=nameProfile]').scrollIntoView().focus().type(lNameProfile)
        for (let m=0; m<lstHabils.length; m++){
            this.seleccionaHabilidad(lstHabils[m])
        }
        //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(0).children().eq(0).click()      
        //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(56).children().eq(0).click()
        //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(80).children().eq(0).click()
        cy.get('[data-cy=createProfile]').click()
    }

    seleccionaHabilidad(id_habil: number){
        cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(id_habil).children().eq(0).click()
    }

    seleccionProyecto(num_proy: number){
      cy.get('[data-cy=lstProjCompanyView]').children().eq(1).children().eq(num_proy).children().eq(4).children().eq(0).click({force: true})
      cy.get('[data-cy=linkDetailProject]').click({force: true})
    }

}


describe('ABCJobs Test', () => {
    before(() => {
        const DP=new DatosPruebaPuestos()
        DP.crearDatosPrueba()
        DP.crearUsuario(userNameABC, userPass, "EMPLEADO_ABC")
        //DP.loginUsuario('UserABC1705290774842', userPass)
    })
        
    beforeEach(() => {
      const DP=new DatosPruebaPuestos()
      DP.loginUsuario(userNameABC, userPass)
    })

    afterEach(() => {
      //cy.get('[data-cy=root]').within(() => {
      //  cy.get('[data-cy=logoutMenu]').click()
      //})
    })

    it('Test Filter Company', () => {
        cy.visit('/asignaPuesto')
        const valor=30
        expect(valor).eq(30)
        cy.get('[data-cy=filtroEmpresaPuestos]').type(UUIDempresa)
        cy.get('[data-cy=updateQueryPuestos]').click()
        //cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).invoke('text').then(
        //    total => expect(total).to.eq(' 1 - 30 of 45 '))
        cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
          ($pag)=> { 
            let cadena=$pag.text()
            cadena=cadena.substring(cadena.indexOf("of"))
            cadena=cadena.substring(cadena.indexOf(" ")+1)
            let total=Number(cadena)
            expect(total).eq(NUM_EMPRESAS*NUM_PROYECTOS*NUM_PERFILES)
          })
      })

    it('Test Filter Project', () => {
      cy.visit('/asignaPuesto')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_PERFILES)
        })
    })

    it('Test Filter ProfileProject', () => {
      cy.visit('/asignaPuesto')
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS*NUM_PROYECTOS)
        })
    })

    it('Test Filter ProfileProject and Project', () => {
      cy.visit('/asignaPuesto')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS)
        })
    })


  })
