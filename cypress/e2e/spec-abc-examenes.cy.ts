import {faker} from '@faker-js/faker'

const NUM_EMPRESAS=2
const NUM_PROYECTOS=1
const NUM_PERFILES=3
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
        apellido="Apellido"+ahora.getTime().toString()
        this.creaCandidato(nombre, apellido)
        lstNombresUsers.push(nombre)
        lstApellidosUsers.push(apellido)
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

    seleccionaHabilidad(id_habil: number){
        cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(id_habil).children().eq(0).click()
    }

}


describe('ABCJobs Test Examenes', () => {
    before(() => {
        const DP=new DatosPruebaPuestos()
        //DP.crearDatosCandidatos()
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

    it('Test Examenes', () => {
      //const DP=new DatosPruebaPuestos()
      cy.visit('/examenes')   //listaCumplenPerfil
      //cy.get('[data-cy=btnUpdateQueryTestNew]').click()        //cy.get('[data-cy=btnTestNew]').click()

      cy.get('[data-cy=linkTestNew]').click()
      //cy.get('[data-cy=linkTestNew]').trigger('mousedown')
      cy.get('[data-cy=btnSelCandExamen]').click()
      cy.get('[data-cy=filterApellidoSelCand]').type('Padilla', {force: true})  //filterNombreSelCand
      cy.get('[data-cy=btnUpdateSelCand]').click()
      cy.get('[data-cy=lstCandSelCand]').children().eq(1).children().eq(0).children().eq(0).click()
      cy.get('[data-cy=btnSelectSelCand]').click()  //btnCancelSelCand
      cy.get('[data-cy=btnSelHabilExamen]').click()
      cy.get('[data-cy=filterHabil]').type('ja', {force: true})
      cy.get('[data-cy=lstHabilsSelHabil]').children().eq(1).children().eq(0).children().eq(0).click()
      cy.get('[data-cy=btnSelectSelHabil]').click()  //btnCancelSelHabil
      cy.get('[data-cy=createTest]').click()
      //pagSelHabil   pagSelCand
    })

  })
