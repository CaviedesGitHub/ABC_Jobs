import {faker} from '@faker-js/faker'

const NUM_EMPRESAS=1
const NUM_PROYECTOS=1
const NUM_PERFILES=1
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

let UUIDcandidato=faker.string.uuid();

let ahora: Date;
let nombre_emp: string;
let lstPerfilesHab=[[0, 56, 80], [1, 57, 81], [2, 58, 82]]
let lstPerfilesHab2=[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
                     [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
                     [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]]
let lstPerfilesHabAzar: Array<Array<number>>=[]   
let PerfilAzar: number[]=[]
let PerfilAzarTemp: number[]=[]

while (PerfilAzar.length<10){
  let x=Math.ceil(Math.random()*90)
  if (!PerfilAzar.includes(x)){
    PerfilAzar.push(x)
  }
  PerfilAzar.sort(function(a,b){return a-b;})
}

for (let k=0; k<3; k++){
  PerfilAzarTemp=[]
  while (PerfilAzarTemp.length<10){
    let x=Math.ceil(Math.random()*90)
    if (!PerfilAzarTemp.includes(x)){
      PerfilAzarTemp.push(x)
    }
    PerfilAzarTemp.sort(function(a,b){return a-b;})
  } 
  lstPerfilesHabAzar.push(PerfilAzarTemp)
}

//PerfilAzar=[1,2,3,4,5]


function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

let i: number;
for (i=0; i<5; i++){
    //ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
    //               new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())
    lstUUIDEmpresas.push(faker.string.uuid())
    //lstNombresEmpresas[i]="Company"+UUIDempresa+ahora.getTime().toString()
    sleep(500)
}

for (i=0; i<3; i++){
    //ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
    //      new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())  
    lstUUIDProyectos.push(faker.string.uuid())
    //lstNombresProyectos[i]=faker.company.name()+lstUUIDProyectos[i]//+ahora.getTime().toString()
    sleep(500)
}

for (i=0; i<3; i++){
    //ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
    //      new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())  
    lstUUIDPerfilesProy.push(faker.string.uuid())
    //lstNombresPerfilesProy[i]=faker.person.jobTitle()+lstUUIDPerfilesProy[i]//+ahora.getTime().toString()
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
            lstNombresEmpresas.push(nombre_emp)
            this.creaEmpresa(nombre_emp)
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
        apellido="Apellido"+UUIDcandidato+ahora.getTime().toString()
        this.creaCandidato(nombre, apellido)
        lstNombresUsers.push(nombre)
        lstApellidosUsers.push(apellido)

        cy.intercept('GET', '/candidatoUsuarioDetalle/*').as('perfilCand')
        this.asignaPerfilCandidato(lstPerfilesHabAzar[i])
        cy.wait('@perfilCand')
        //cy.wait(2000)
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
      const documento = Math.floor(Math.random()*1000000000)  
      const email = 'Mail'+ahora.getTime().toString()+'@correo.com'
      const phone = faker.phone.number()
      let fecha_nac = faker.date.past()
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

      cy.url().should('include', 'detalleEmpresa')  
      cy.contains('ABC Jobs')
      cy.get('[data-cy=nameCompanyView]').invoke('text').should('eq', nameCompany)
      cy.get('[data-cy=typeCompanyView]').invoke('text').should('eq', type)
      cy.get('[data-cy=emailCompanyView]').invoke('text').should('eq', email)
      cy.get('[data-cy=phoneCompanyView]').invoke('text').should('eq', phone)
      cy.get('[data-cy=contactCompanyView]').invoke('text').should('eq', contact)
      cy.get('[data-cy=countryCompanyView]').invoke('text').should('eq', country)
      cy.get('[data-cy=cityCompanyView]').invoke('text').should('eq', city)
      cy.get('[data-cy=addressCompanyView]').invoke('text').should('eq', address)

      let nombre_proy: string;
      for (let j=0; j<NUM_PROYECTOS; j++){
        nombre_proy=faker.company.name()+lstUUIDProyectos[j]+ahora.getTime().toString()
        lstNombresProyectos.push(nombre_proy)
        this.crearProyecto(nombre_proy);
      }

      let nombre_perfil: string;
      for (let k=0; k<NUM_PROYECTOS; k++){
        cy.get('[data-cy=lstProjCompanyView]').children().eq(1).children().eq(k).children().eq(4).children().eq(0).click({force: true})
        cy.get('[data-cy=linkDetailProject]').click({force: true})
        for (let l=0; l<NUM_PERFILES; l++){
            nombre_perfil=faker.person.jobTitle()+lstUUIDPerfilesProy[l]+ahora.getTime().toString()
            lstNombresPerfilesProy.push(nombre_perfil)
            this.crearPerfil(nombre_perfil, lstPerfilesHabAzar[l])
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
        DP.crearDatosEmpresas()
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

    it('Test InterViews', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/asignaPuesto')
      cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
      cy.get('[data-cy=filtroEmpresaPuestos]').type(UUIDempresa)
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')

      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS*NUM_PROYECTOS*NUM_PERFILES)
      })

      //cy.get('[data-cy=filtroEmpresaPuestos]').type(lstNombresEmpresas[0])
      //cy.get('[data-cy=updateQueryPuestos]').click()
      //cy.wait('@lstPuestos')

      //cy.intercept('GET', '/entrevistas/*').as('entrevistaPuesto')
      cy.get('[data-cy=lstPuestosABC]').children().eq(1).children().eq(0).children().eq(5).children().eq(0).click({force: true})
      cy.get('[data-cy=linkEVPuesto]').click({force: true})
      //cy.wait('@entrevistaPuesto')   
      cy.get('[data-cy=addEntrevistaPuesto]').click()

      cy.intercept('GET', '/cumplenPerfil/*').as('cumplenPerfilEV')
      cy.get('[data-cy=btnCandNewEV]').click()
      cy.wait('@cumplenPerfilEV')  
      cy.get('[data-cy=pagAsignacion]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(1)
      })

      cy.get('[data-cy=lstCandAsig]').children().eq(1).children().eq(0).children().eq(0).click()
      cy.get('[data-cy=selectCandEV]').click({force: true})

      let fechaEV = new Date()
      fechaEV.setDate(fechaEV.getDate()+1)  //let fechaEV=faker.date.soon({days: 15})
      cy.get('[data-cy=fechaNewEV]').type(fechaEV.toISOString().substring(0, 10))

      let horaEV= "08:30"
      cy.get('[data-cy=horaNewEV]').type(horaEV)

      //cy.get('[data-cy=contactNewEV]').type(faker.person.fullName())
      cy.intercept('GET', '/entrevistas/*').as('entrevistaPuesto')
      cy.get('[data-cy=createNewEV]').click()
      //cy.wait('@entrevistaPuesto')  

      //lstEntrevistasPuesto
      //cy.get('[data-cy=pagAsignacion]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
      //  ($pag)=> { 
      //    let cadena=$pag.text()
      //    cadena=cadena.substring(cadena.indexOf("of"))
      //    cadena=cadena.substring(cadena.indexOf(" ")+1)
      //    let total=Number(cadena)
      //    expect(total).eq(1)
      //})

      cy.get('[data-cy=lstEntrevistasPuesto]').contains(lstApellidosUsers[0])
      cy.visit('/entrevistasTodas')
      cy.intercept('POST', '/entrevistasPortal').as('queryAllEV')

      //cy.get('[data-cy=companyAllEV]').type(lstNombresEmpresas[0])
      //cy.get('[data-cy=updateAllEV]').click({force: true})
      //cy.wait('@queryAllEV')  
      //cy.get('[data-cy=lstAllEV]').contains(lstNombresEmpresas[0])
      //cy.get('[data-cy=pagAllEV]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
      //  ($pag)=> { 
      //    let cadena=$pag.text()
      //    cadena=cadena.substring(cadena.indexOf("of"))
      //    cadena=cadena.substring(cadena.indexOf(" ")+1)
      //    let total=Number(cadena)
      //    expect(total).eq(1)
      //})

      //cy.get('[data-cy=companyAllEV]').clear()
      //cy.get('[data-cy=projectAllEV]').type(lstNombresProyectos[0])
      //cy.get('[data-cy=updateAllEV]').click({force: true})
      //cy.wait('@queryAllEV')  
      //cy.get('[data-cy=lstAllEV]').contains(lstNombresProyectos[0])
      //cy.get('[data-cy=pagAllEV]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
      //  ($pag)=> { 
      //    let cadena=$pag.text()
      //    cadena=cadena.substring(cadena.indexOf("of"))
      //    cadena=cadena.substring(cadena.indexOf(" ")+1)
      //    let total=Number(cadena)
      //    expect(total).eq(1)
      //})

      //cy.get('[data-cy=projectAllEV]').clear()
      //cy.get('[data-cy=profileAllEV]').type(lstNombresPerfilesProy[0])
      //cy.get('[data-cy=updateAllEV]').click({force: true})
      //cy.wait('@queryAllEV')  
      //cy.get('[data-cy=lstAllEV]').contains(lstNombresPerfilesProy[0])
      //cy.get('[data-cy=pagAllEV]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
      // ($pag)=> { 
      //    let cadena=$pag.text()
      //    cadena=cadena.substring(cadena.indexOf("of"))
      //    cadena=cadena.substring(cadena.indexOf(" ")+1)
      //    let total=Number(cadena)
      //    expect(total).eq(1)
      //})

      //cy.get('[data-cy=profileAllEV]').clear()
      //cy.get('[data-cy=candAllEV]').type(lstApellidosUsers[0])
      //cy.get('[data-cy=updateAllEV]').click({force: true})
      //cy.wait('@queryAllEV')  
      //cy.get('[data-cy=lstAllEV]').contains(lstApellidosUsers[0])
      //cy.get('[data-cy=pagAllEV]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
      //  ($pag)=> { 
      //    let cadena=$pag.text()
      //    cadena=cadena.substring(cadena.indexOf("of"))
      //    cadena=cadena.substring(cadena.indexOf(" ")+1)
      //    let total=Number(cadena)
      //    expect(total).eq(1)
      //})

      cy.get('[data-cy=candAllEV]').clear()
      cy.get('[data-cy=companyAllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=projectAllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=companyAllEV]').clear()
      cy.get('[data-cy=projectAllEV]').clear()
      cy.get('[data-cy=candAllEV]').type(lstApellidosUsers[0])
      cy.get('[data-cy=fecha1AllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=fecha2AllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=updateAllEV]').click({force: true})
      cy.wait('@queryAllEV')  
      //cy.get('[data-cy=lstAllEV]').contains(lstApellidosUsers[0])
      cy.get('[data-cy=pagAllEV]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(1)
      })

      cy.get('[data-cy=lstAllEV]').children().eq(1).children().eq(0).children().eq(7).children().eq(0).click({force: true})
      cy.get('[data-cy=linkResultEV]').click({force: true}) //linkViewResultEV
      cy.get('[data-cy=valueCalifResultEV]').select('EXCELLENT')
      let anotacion=faker.lorem.paragraph(1)
      cy.get('[data-cy=anotaResultEV]').type(anotacion)
      cy.get('[data-cy=createResultEV]').click({force: true}) 

      cy.get('[data-cy=candAllEV]').clear()
      cy.get('[data-cy=candAllEV]').type(lstApellidosUsers[0])
      cy.get('[data-cy=fecha1AllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=fecha2AllEV]').type(fechaEV.toISOString().substring(0, 10))
      cy.get('[data-cy=updateAllEV]').click({force: true})

      cy.get('[data-cy=lstAllEV]').children().eq(1).children().eq(0).children().eq(7).children().eq(0).click({force: true})
      cy.get('[data-cy=linkViewResultEV]').click({force: true}) 
      //cy.wait(2000)
      //cy.get('[data-cy=anotaViewResultEV]').should(($area)=>{
      //  let cadena=$area.text()
      //  expect(cadena).eq(anotacion)
      //})
    })

    it('Test Job assignment', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/asignaPuesto')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS) //1
        })
        
      cy.intercept('GET', '/cumplenPerfil/*').as('cumplenPerfil')
      cy.get('[data-cy=lstPuestosABC]').children().eq(1).children().eq(0).children().eq(5).children().eq(0).click({force: true})
      cy.get('[data-cy=linkAssignPuesto]').click({force: true})
      cy.wait('@cumplenPerfil')      
      //cy.wait(2000)

      //cy.get('[data-cy=pagAsignacion]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should('have.text', '1 - 1 of 1 ')
      cy.get('[data-cy=pagAsignacion]').children().eq(0).children().eq(0).
                                        children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(1) //1
      })

      cy.get('[data-cy=lstCandAsig]').children().eq(1).children().eq(0).children().eq(0).click()
      cy.get('[data-cy=updateAsignacion]').click({force: true})
      cy.get('[data-cy=backAsignacion]').click({force: true})

      cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')
      cy.get('[data-cy=lstPuestosABC]').contains(lstApellidosUsers[0])

      cy.get('[data-cy=filtroProyectoPuestos]').clear()
      cy.get('[data-cy=filtroPerfilPuestos]').clear()
      cy.get('[data-cy=filtroCandidatoPuestos]').type(lstApellidosUsers[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')
      cy.get('[data-cy=lstPuestosABC]').contains(lstApellidosUsers[0])
      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(1)
        })
    })

    it.skip('Test Match profiles', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/seleccionHabilidades')   //listaCumplenPerfil

      for (let m=0; m<PerfilAzar.length; m++){
        DP.seleccionaHabilidad(PerfilAzar[m]-1)
      }
      cy.get('[data-cy=buscaCandidatosABCPerfil]').click()
      //cy.wait(3000)
      cy.get('[data-cy=pagCumplenPerfil]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_CANDIDATOS)
        })
    })

    it('Test Filter Company', () => {
        cy.visit('/asignaPuesto')
        cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
        cy.get('[data-cy=filtroEmpresaPuestos]').type(UUIDempresa)
        cy.get('[data-cy=updateQueryPuestos]').click()
        cy.wait('@lstPuestos')

        cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
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
      cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')

      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS*NUM_PERFILES)
        })
    })

    it('Test Filter ProfileProject', () => {
      cy.visit('/asignaPuesto')
      cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')

      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
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
      cy.intercept('POST', '/empresas/puestos').as('lstPuestos')
      cy.get('[data-cy=filtroProyectoPuestos]').type(lstUUIDProyectos[0])
      cy.get('[data-cy=filtroPerfilPuestos]').type(lstUUIDPerfilesProy[0])
      cy.get('[data-cy=updateQueryPuestos]').click()
      cy.wait('@lstPuestos')

      cy.get('[data-cy=pagAsignaPuesto]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).should(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_EMPRESAS)
        })
    })


  })
