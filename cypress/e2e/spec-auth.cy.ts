import {faker} from '@faker-js/faker'

let TimeStamp=Date.now().toString()
let userName='User'+TimeStamp
let userPass='12345'
let userRole='CANDIDATE' //EMPRESA, ABCJOBS EMPLOYEE

beforeEach(() => {

})

describe('Signup Test', () => {
    it('Correct Signup & User Existent', () => {
      const name = userName
      const pass = userPass
      const role = userRole

      cy.visit('/signup')
      cy.get('[data-cy=nameSignup]').type(`${name}`)
      cy.get('[data-cy=pass1Signup]').type(`${pass}`)
      cy.get('[data-cy=pass2Signup]').type(`${pass}`)
      cy.get('[data-cy=roleSignup]').select(role)
      cy.get('[data-cy=submitSignup]').click()
      cy.get('[data-cy=root]').within(() => {
         cy.get('#toast-container').contains('User successfully created.')
      })

      cy.visit('/signup')
      cy.contains('ABC Jobs')
      cy.contains('Sign Up New User')
      cy.get('[data-cy=nameSignup]').type(`${name}`)
      cy.get('[data-cy=pass1Signup]').type(`${pass}`)
      cy.get('[data-cy=pass2Signup]').type(`${pass}`)
      cy.get('[data-cy=roleSignup]').select(role)
      cy.get('[data-cy=submitSignup]').click()
      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('Usuario Ya Existe')
      })
    })

    it('Wrong Password', () => {
      const name = 'User_NonExistent'
      const pass1 = userPass
      const pass2 = userPass+'X'
      const role = userRole

      cy.visit('/signup')
      cy.contains('ABC Jobs')
      cy.contains('Sign Up New User')
      cy.get('[data-cy=nameSignup]').type(`${name}`)
      cy.get('[data-cy=pass1Signup]').type(`${pass1}`)
      cy.get('[data-cy=pass2Signup]').type(`${pass2}`)
      cy.get('[data-cy=roleSignup]').select(role)
      cy.get('[data-cy=submitSignup]').click()
      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('No coincide password de confirmación')
      })
    })

    it('Wrong Role', () => {
        const name = 'User_NonExistent'
        const pass1 = userPass
        const pass2 = userPass
  
        cy.visit('/signup')
        cy.contains('ABC Jobs')
        cy.contains('Sign Up New User')
        cy.get('[data-cy=nameSignup]').type(`${name}`)
        cy.get('[data-cy=pass1Signup]').type(`${pass1}`)
        cy.get('[data-cy=pass2Signup]').type(`${pass2}`)
        cy.get('[data-cy=submitSignup]').click()
        cy.get('[data-cy=root]').within(() => {
          cy.get('#toast-container').contains('Valor Invalido para Tipo de Usuario')
        })
      })

    it('SignUp Link', () => { 
        cy.visit('/signup')
        cy.contains('ABC Jobs')
        cy.contains('Sign Up New User')
        cy.get('[data-cy=loginSignup]').click()
        cy.url().should('include', 'login')
      })

    it('User NonExistent', () => {
        const name = 'User_nonExistent'
        const pass = userPass

        cy.visit('/login')
        cy.contains('ABC Jobs')
        cy.contains('Welcome')
        cy.get('[data-cy=nameLogin]').type(`${name}`)
        cy.get('[data-cy=passLogin]').type(`${pass}`)
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=root]').within(() => {
            cy.get('#toast-container').contains('LogIn Incorrecto. El nombre de usuario NO existe.')
        })
    })
  
      it('Wrong Password', () => {
        const name = userName
        const pass = userPass+'X'  //'WrongPass'
  
        cy.visit('/login')
        cy.contains('ABC Jobs')
        cy.contains('Welcome')
        cy.get('[data-cy=nameLogin]').type(`${name}`)
        cy.get('[data-cy=passLogin]').type(`${pass}`)
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=root]').within(() => {
           cy.get('#toast-container').contains('LogIn Incorrecto. Password Incorrecta.')
        })
      })
  
      it('SignUp Link', () => { 
          cy.visit('/login')
          cy.contains('ABC Jobs')
          cy.contains('Welcome')
          cy.get('[data-cy=signupLogin]').click()
          cy.url().should('include', 'signup')
        })
  
      it('Correct Login', () => { 
        const name = userName
        const pass = userPass
  
        cy.visit('/login')
        cy.contains('ABC Jobs')
        cy.contains('Welcome')
        cy.get('[data-cy=nameLogin]').type(`${name}`)
        cy.get('[data-cy=passLogin]').type(`${pass}`)
        cy.get('[data-cy=submitLogin]').click()
        cy.get('[data-cy=root]').within(() => {
          cy.get('#toast-container').contains('Successful Login.')
        })
      })

  })