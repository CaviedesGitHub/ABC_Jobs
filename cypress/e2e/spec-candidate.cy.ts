import {faker} from '@faker-js/faker'

const NUM_CANDIDATOS=1
const LONG_VECTOR_AZAR=10

let TimeStamp=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
                       new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds()).getTime().toString()
let userName='UserCand'+TimeStamp
let userPass='12345'
let userRole='CANDIDATO' //'EMPRESA' , EMPLEADO_ABC


let lstNombresUsers: string[]=[]
let lstApellidosUsers: string[]=[]

let ahora: Date;
let lstPerfilesHab=[[0, 56, 80], [1, 57, 81], [2, 58, 82]]
let PerfilAzar: number[]=[]

while (PerfilAzar.length<10){
    let x=Math.ceil(Math.random()*90)
    if (!PerfilAzar.includes(x)){
      PerfilAzar.push(x)
    }
    PerfilAzar.sort(function(a,b){return a-b;})
  }


function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}


describe('Candidate Test', () => {
    before(() => {
    })
        
    beforeEach(() => {
    })

    afterEach(() => {
    })

    it('Create Candidate', () => {
        cy.visit('/signup')
        cy.get('[data-cy=nameSignup]').type(`${userName}`)
        cy.get('[data-cy=pass1Signup]').type(`${userPass}`)
        cy.get('[data-cy=pass2Signup]').type(`${userPass}`)
        cy.get('[data-cy=roleSignup]').select(userRole)
        cy.get('[data-cy=submitSignup]').click()
        cy.get('[data-cy=root]').within(() => {
            cy.get('#toast-container').contains('User successfully created.')
            cy.get('#toast-container').children().eq(0).children().eq(0).click()
        })

        cy.visit('/login')
        cy.get('[data-cy=nameLogin]').type(`${userName}`)
        cy.get('[data-cy=passLogin]').type(`${userPass}`)
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=root]').within(() => {
            cy.get('#toast-container').contains('Successful Login.')
            cy.get('#toast-container').children().eq(0).children().eq(0).click()
        })

        ahora=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
                            new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())
        let nombre="Nombre"+ahora.getTime().toString()
        let apellido="Apellido"+ahora.getTime().toString()

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
    })
})


