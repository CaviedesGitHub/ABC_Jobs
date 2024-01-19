import {faker} from '@faker-js/faker'

const NUM_EMPRESAS=1
const NUM_PROYECTOS=1
const NUM_PERFILES=2
const NUM_CANDIDATOS=3
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

        cy.intercept('GET', '/candidatoUsuarioDetalle/*').as('lstHabilsCand')
        this.asignaPerfilCandidato(PerfilAzar)
        cy.wait('@lstHabilsCand')
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

    seleccionaHabilidad(id_habil: number){
        cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(id_habil).children().eq(0).click()
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
    
}


describe('ABCJobs Test', () => {
    before(() => {
        const DP=new DatosPruebaPuestos()
        DP.crearDatosCandidatos()
        DP.crearUsuario(userNameABC, userPass, "EMPLEADO_ABC")
    })
        
    beforeEach(() => {
      const DP=new DatosPruebaPuestos()
      DP.loginUsuario(userNameABC, userPass)
    })

    afterEach(() => {
    })

    it('Test Match profiles', () => {
      const DP=new DatosPruebaPuestos()
      cy.visit('/seleccionHabilidades')   //listaCumplenPerfil

      for (let m=0; m<PerfilAzar.length; m++){
        DP.seleccionaHabilidad(PerfilAzar[m]-1)
      }
      cy.intercept('POST', '/cumplenPerfilporLista').as('cumplenPerfilLista')
      cy.get('[data-cy=buscaCandidatosABCPerfil]').click()
      cy.wait('@cumplenPerfilLista')
      //cy.wait(3000)
      cy.get('[data-cy=pagCumplenPerfil]').children().eq(0).children().eq(0).children().eq(1).children().eq(0).then(
        ($pag)=> { 
          let cadena=$pag.text()
          cadena=cadena.substring(cadena.indexOf("of"))
          cadena=cadena.substring(cadena.indexOf(" ")+1)
          let total=Number(cadena)
          expect(total).eq(NUM_CANDIDATOS)
        })
      for (let k=0; k<NUM_CANDIDATOS; k++){
        cy.get('[data-cy=lstCandCumplen]').contains(lstApellidosUsers[k])
      }
    })
})