import {faker} from '@faker-js/faker'

const NUM_EMPRESAS=1
const NUM_PROYECTOS=1
const NUM_PERFILES=2
const NUM_CANDIDATOS=1
const LONG_VECTOR_AZAR=10

let TimeStamp=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
                       new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds()).getTime().toString()
let userName='User'+TimeStamp
let userNameABC='UserABC'+TimeStamp
let userPass='12345'
let userRole='EMPRESA' //'CANDIDATO' , ABCJOBS EMPLOYEE
let companyName=''
let companyEmail=''
let Skill1=''
let Skill2=''
let Skill3=''

let lstNombresEmpresas: string[]=[]
let lstNombresProyectos: string[]=[]
let lstNombresPerfilesProy: string[]=[]

let lstNombresUsers: string[]=[]
let lstApellidosUsers: string[]=[]

let UUIDempresa=faker.string.uuid();

let lstUUIDEmpresas: string[]=[]
let lstUUIDProyectos: string[]=[]
let lstUUIDPerfilesProy: string[]=[]

let ahora: Date;
let nombre_emp: string;
let lstPerfilesHab=[[0, 56, 80], [1, 57, 81], [2, 58, 82]]
let PerfilAzar: number[]=[]

while (PerfilAzar.length<10){
  let x=Math.ceil(Math.random()*90)
  if (!PerfilAzar.includes(x)){
    PerfilAzar.push(x)
  }
  PerfilAzar.sort(function(a,b){return a-b;})
}

//PerfilAzar=[1,2,3,4,5]


function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

let i: number;
for (i=0; i<5; i++){
    lstUUIDEmpresas.push(faker.string.uuid())
}

for (i=0; i<3; i++){
    lstUUIDProyectos.push(faker.string.uuid())
    sleep(500)
}

for (i=0; i<3; i++){
    lstUUIDPerfilesProy.push(faker.string.uuid())
    sleep(500)
}

class DatosPruebaPuestos{

    inicio(){
    }
    crearDatosEmpresas(){
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

    crearDatosCandidatos(){
      let nombre=""
      let apellido=""
      for (let i=0; i<NUM_CANDIDATOS; i++){
        ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
               new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())

        userName = 'UserCand'+ahora.getTime().toString()
        const pass = userPass
        const role = "CANDIDATO"
        this.crearUsuario(userName, pass, role)
        this.loginUsuario(userName, pass)

        nombre="Nombre"+ahora.getTime().toString()
        apellido="Apellido"+ahora.getTime().toString()
        this.creaCandidato(nombre, apellido)
        lstNombresUsers.push(nombre)
        lstApellidosUsers.push(apellido)

        this.asignaPerfilCandidato(PerfilAzar)
        cy.wait(2000)
        cy.get('[data-cy=pagVerCandidato]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
          ($pag)=> { 
            let cadena=$pag.text()
            cadena=cadena.substring(cadena.indexOf("of"))
            cadena=cadena.substring(cadena.indexOf(" ")+1)
            let total=Number(cadena)
            expect(total).eq(PerfilAzar.length)
        })
      }
    }

    creaCandidato(nombre: string, apellido: string){
      const name = nombre
      const lastname = apellido
      const documento = Math.ceil(ahora.getTime()/10000)
      const email = 'Mail'+ahora.getTime().toString()+'@correo.com'
      const phone = faker.phone.number()
      let fecha_nac = faker.date.recent()
      fecha_nac.setFullYear(fecha_nac.getFullYear()-18)
      const city = faker.location.city()
      const address = faker.location.streetAddress()

      cy.url().should('include', 'candidato')  
      cy.get('[data-cy=nombresCrearCandidato]').type(`${name}`)
      cy.get('[data-cy=apellidosCrearCandidato]').type(`${lastname}`)
      cy.get('[data-cy=documentoCrearCandidato]').type(`${documento}`)
      cy.get('[data-cy=emailCrearCandidato]').type(`${email}`)
      cy.get('[data-cy=phoneCrearCandidato]').type(`${phone}`)
      cy.get('[data-cy=ciudadCrearCandidato]').type(`${city}`)
      cy.get('[data-cy=direccionCrearCandidato]').type(`${address}`)
      cy.get('[data-cy=fecha_nacCrearCandidato]').type(fecha_nac.toISOString().substring(0, 10))
      cy.get('[data-cy=btnCrearCandidato]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('Candidate successfully created.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })

    }

    asignaPerfilCandidato(lstHabils: number[]){
      //cy.visit('/agregarPerfilCandidato', {onBeforeLoad: (win) => {win.sessionStorage.clear()}})
      cy.get('[data-cy=btnAsignaPerfil]').click()
      for (let i=0; i<lstHabils.length; i++){
        cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(lstHabils[i]-1).children().eq(0).click()      
      }
      cy.get('[data-cy=createProfile]').click()      
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
            cy.get('#toast-container').children().eq(0).children().eq(0).click()
        })
    }
    loginUsuario(userName: string, pass: string){
        cy.visit('/login')  //, {onBeforeLoad: (win) => {win.sessionStorage.clear()}}
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
            this.seleccionaHabilidad(lstHabils[m]-1)
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
        //DP.crearDatosEmpresas()
        DP.crearDatosCandidatos()
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

    it('Test Match profiles', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/examenes')   //listaCumplenPerfil
      cy.get('[data-cy=btnUpdateQueryTestNew]').click()
    })

    it('Test Match profiles', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/seleccionHabilidades')   //listaCumplenPerfil

      for (let m=0; m<PerfilAzar.length; m++){
        DP.seleccionaHabilidad(PerfilAzar[m]-1)
      }
      cy.get('[data-cy=buscaCandidatosABCPerfil]').click()
      cy.wait(3000)
      cy.get('[data-cy=pagCumplenPerfil]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_CANDIDATOS)
        })
    })

    it.skip('Test Filter Company', () => {
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

    it.skip('Test Filter Project', () => {
      cy.visit('/asignaPuesto')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS*NUM_PERFILES)
        })
    })

    it.skip('Test Filter ProfileProject', () => {
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

    it.skip('Test Filter ProfileProject and Project', () => {
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
