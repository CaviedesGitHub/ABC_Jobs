import {faker} from '@faker-js/faker'

let TimeStamp=Date.now().toString()
let userName='User'+TimeStamp
let userPass='12345'
let userRole='EMPRESA' //'CANDIDATE' , ABCJOBS EMPLOYEE
let companyName=''
let companyEmail=''
let Skill1=''
let Skill2=''
let Skill3=''

describe('Company Test', () => {
    before(() => {

    })
        
    beforeEach(() => {
      userName = 'User'+Date.now().toString()
      const pass = userPass
      const role = userRole

      cy.visit('/signup')
      cy.get('[data-cy=nameSignup]').type(`${userName}`)
      cy.get('[data-cy=pass1Signup]').type(`${pass}`)
      cy.get('[data-cy=pass2Signup]').type(`${pass}`)
      cy.get('[data-cy=roleSignup]').select(role)
      cy.get('[data-cy=submitSignup]').click()
      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('User successfully created.')
      })

      cy.visit('/login')
      cy.get('[data-cy=nameLogin]').type(`${userName}`)
      cy.get('[data-cy=passLogin]').type(`${pass}`)
      cy.get('[data-cy=submitLogin]').click()
      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('Successful Login.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
    })

    afterEach(() => {
      //cy.get('[data-cy=root]').within(() => {
      //  cy.get('[data-cy=logoutMenu]').click()
      //})
    })

    it('Company Creation', () => {
      const nameCompany = 'Company'+Date.now().toString()
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
    })

    it('Invalid Company Name ', () => {
      const nameCompany2 = companyName
      const type2 = 'Comercio'
      const email2 = 'Mail'+Date.now().toString()+'@correo.com'
      const phone2 = faker.phone.number()
      const contact2 = faker.person.fullName()
      const country2 = faker.location.country()
      const city2 = faker.location.city()
      const address2 = faker.location.streetAddress()

      cy.url().should('include', 'empresa')  
      cy.get('[data-cy=nameCompany]').type(`${nameCompany2}`)
      cy.get('[data-cy=typeCompany]').type(`${type2}`)
      cy.get('[data-cy=emailCompany]').type(`${email2}`)
      cy.get('[data-cy=phoneCompany]').type(`${phone2}`)
      cy.get('[data-cy=contactCompany]').type(`${contact2}`)
      cy.get('[data-cy=countryCompany]').type(`${country2}`)
      cy.get('[data-cy=cityCompany]').type(`${city2}`)
      cy.get('[data-cy=addressCompany]').type(`${address2}`)
      cy.get('[data-cy=createCompany]').click()
      cy.get('[data-cy=root]').within(() => {
         cy.get('#toast-container').contains('Empresa no se pudo crear: El nombre suministrado ya existe.')
         //cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
    })

    it('Invalid EMail ', () => {
      const nameCompany2 = 'Company'+Date.now().toString()
      const type2 = 'Comercio'
      const email2 = companyEmail
      const phone2 = faker.phone.number()
      const contact2 = faker.person.fullName()
      const country2 = faker.location.country()
      const city2 = faker.location.city()
      const address2 = faker.location.streetAddress()

      cy.url().should('include', 'empresa')  
      cy.get('[data-cy=nameCompany]').type(`${nameCompany2}`)
      cy.get('[data-cy=typeCompany]').type(`${type2}`)
      cy.get('[data-cy=emailCompany]').type(`${email2}`)
      cy.get('[data-cy=phoneCompany]').type(`${phone2}`)
      cy.get('[data-cy=contactCompany]').type(`${contact2}`)
      cy.get('[data-cy=countryCompany]').type(`${country2}`)
      cy.get('[data-cy=cityCompany]').type(`${city2}`)
      cy.get('[data-cy=addressCompany]').type(`${address2}`)
      cy.get('[data-cy=createCompany]').click()
      cy.get('[data-cy=root]').within(() => {
         cy.get('#toast-container').contains('Empresa no se pudo crear: El correo suministrado ya existe.')
         //cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
    })

    it('Project Creation', () => {
      const nameCompany = 'Company'+Date.now().toString()
      const type = 'Comercio'
      const email = 'Mail'+Date.now().toString()+'@correo.com'
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

      let nameProject=faker.company.name()+Date.now().toString()
      let fecha_inicio=faker.date.soon({days: 10})
      let descProject=faker.lorem.sentence()
      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)//(faker.commerce.productName()+Date.now().toString())
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)//(faker.commerce.productDescription())
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('The project was successfully created.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })

      cy.get('[data-cy=lstProjCompanyView]').contains(nameProject)
      cy.get('[data-cy=lstProjCompanyView]').contains(descProject)

      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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
      
      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('proyecto no se pudo crear: El nombre suministrado ya existe para esta empresa.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(faker.company.name()+Date.now().toString())
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(faker.lorem.sentences(4))
      cy.get('[data-cy=nameProject]').scrollIntoView().focus()
      cy.get('[data-cy=root]').contains('Description too long')
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=nameProject]').type('A')
      cy.get('[data-cy=descProject]').scrollIntoView().focus().type(faker.lorem.sentence())
      cy.get('[data-cy=root]').contains('Name too short')
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=nameProject]').scrollIntoView().focus()
      cy.get('[data-cy=descProject]').scrollIntoView().focus().type(faker.lorem.sentence())
      cy.get('[data-cy=root]').contains('Name required')
      cy.get('[data-cy=cancelProject]').click()
    })

    it('Profile Creation', () => {
      const nameCompany = 'Company'+Date.now().toString()
      const type = 'Comercio'
      const email = 'Mail'+Date.now().toString()+'@correo.com'
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

      let nameProject=faker.company.name()+Date.now().toString()
      let descProject=faker.lorem.sentence()
      let fecha_inicio=faker.date.soon({days: 10})
      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)//(faker.commerce.productName()+Date.now().toString())
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)//(faker.commerce.productDescription())
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('The project was successfully created.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })

      cy.get('[data-cy=lstProjCompanyView]').contains(nameProject)
      cy.get('[data-cy=lstProjCompanyView]').contains(descProject)

      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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
      
      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('proyecto no se pudo crear: El nombre suministrado ya existe para esta empresa.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(faker.company.name()+Date.now().toString())
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(faker.lorem.sentences(4))
      cy.get('[data-cy=nameProject]').scrollIntoView().focus()
      cy.get('[data-cy=root]').contains('Description too long')
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=nameProject]').type('A')
      cy.get('[data-cy=descProject]').scrollIntoView().focus().type(faker.lorem.sentence())
      cy.get('[data-cy=root]').contains('Name too short')
      cy.get('[data-cy=cancelProject]').click()

      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=nameProject]').scrollIntoView().focus()
      cy.get('[data-cy=descProject]').scrollIntoView().focus().type(faker.lorem.sentence())
      cy.get('[data-cy=root]').contains('Name required')
      cy.get('[data-cy=cancelProject]').click()

      cy.url().should('include', 'detalleEmpresa')  
      cy.contains('ABC Jobs')
      cy.get('[data-cy=lstProjCompanyView]').children().eq(1).children().eq(0).children().eq(4).children().eq(0).click()
      cy.get('[data-cy=linkDetailProject]').click()


      cy.url().should('include', 'detalleProyecto')  
      cy.contains('ABC Jobs')
      cy.get('[data-cy=addProfile]').click()
      let lNameProfile=faker.person.jobTitle()+Date.now().toString()
      cy.get('[data-cy=nameProfile]').scrollIntoView().focus().type(lNameProfile)
      //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(1).children().eq(0)
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(0).children().eq(0).click()      
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(56).children().eq(0).click()
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(80).children().eq(0).click()
      cy.get('[data-cy=createProfile]').click()
      //cy.get('[data-cy=root]').within(() => {
      //   cy.get('#toast-container').contains('Profile successfully created.')  // Project data were successfully retrieved.
      //   cy.get('#toast-container').children().eq(0).children().eq(0).click()
      //})
      ////cy.get('[data-cy=cancelProfile]').click()

      cy.get('[data-cy=lstProfile]').contains('JavaScript')
      cy.get('[data-cy=lstProfile]').contains('Abierto')
      cy.get('[data-cy=lstProfile]').contains('La comunicación')

      cy.get('[data-cy=addProfile]').click()
      cy.get('[data-cy=nameProfile]').scrollIntoView().focus()
      cy.get('[data-cy=filterSkills]').scrollIntoView().focus()
      cy.get('[data-cy=root]').contains('Name required')
      cy.get('[data-cy=cancelProfile]').click()

      cy.get('[data-cy=addProfile]').click()
      cy.get('[data-cy=nameProfile]').scrollIntoView().focus().type('A')
      cy.get('[data-cy=filterSkills]').scrollIntoView().focus()
      cy.get('[data-cy=root]').contains('Name too short')
      cy.get('[data-cy=cancelProfile]').click()

      cy.get('[data-cy=addProfile]').click()
      cy.get('[data-cy=nameProfile]').type(lNameProfile)
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(1).children().eq(0).click()      
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(57).children().eq(0).click()
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(81).children().eq(0).click()
      cy.get('[data-cy=createProfile]').click()
      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('perfil no se pudo crear: El nombre de perfil suministrado ya existe para este proyecto.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })
      cy.get('[data-cy=cancelProfile]').click()

    })

    it('Match Profile', () => {
      const nameCompany = 'Company'+Date.now().toString()
      const type = 'Comercio'
      const email = 'Mail'+Date.now().toString()+'@correo.com'
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

      let nameProject=faker.company.name()+Date.now().toString()
      let descProject=faker.lorem.sentence()
      let fecha_inicio=faker.date.soon({days: 10})
      cy.get('[data-cy=addProjCompanyView]').click()
      cy.get('[data-cy=nameProject]').type(nameProject)//(faker.commerce.productName()+Date.now().toString())
      cy.get('[data-cy=fecha_iniProject]').type(fecha_inicio.toISOString().substring(0, 10))
      cy.get('[data-cy=descProject]').type(descProject)//(faker.commerce.productDescription())
      cy.get('[data-cy=submitProject]').click()

      cy.get('[data-cy=root]').within(() => {
        cy.get('#toast-container').contains('The project was successfully created.')
        cy.get('#toast-container').children().eq(0).children().eq(0).click()
      })

      cy.get('[data-cy=lstProjCompanyView]').contains(nameProject)
      cy.get('[data-cy=lstProjCompanyView]').contains(descProject)

      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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
      
      nameProject=faker.company.name()+Date.now().toString()
      fecha_inicio=faker.date.soon({days: 10})
      descProject=faker.lorem.sentence()
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

      cy.url().should('include', 'detalleEmpresa')  
      cy.contains('ABC Jobs')
      cy.get('[data-cy=lstProjCompanyView]').children().eq(1).children().eq(0).children().eq(4).children().eq(0).click()
      cy.get('[data-cy=linkDetailProject]').click()


      cy.url().should('include', 'detalleProyecto')  
      cy.contains('ABC Jobs')
      cy.get('[data-cy=addProfile]').click()
      let lNameProfile=faker.person.jobTitle()+Date.now().toString()
      cy.get('[data-cy=nameProfile]').scrollIntoView().focus().type(lNameProfile)
      cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(0).children().eq(0).click()      
      //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(56).children().eq(0).click()
      //cy.get('[data-cy=lstSkills]').children().eq(1).children().eq(80).children().eq(0).click()
      cy.get('[data-cy=createProfile]').click()
      //cy.get('[data-cy=root]').within(() => {
      //   cy.get('#toast-container').contains('Profile successfully created.')
      //   cy.get('#toast-container').children().eq(0).children().eq(0).click()
      //})

      cy.get('[data-cy=lstProfile]').contains('JavaScript')
      //cy.get('[data-cy=lstProfile]').contains('Abierto')
      //cy.get('[data-cy=lstProfile]').contains('La comunicación')
      cy.get('[data-cy=lstProfile]').children().eq(1).children().eq(0).children().eq(6).children().eq(0).click()
      cy.get('[data-cy=linkMatchProfile]').click()
      cy.get('[data-cy=root]').contains('JavaScript')
      cy.get('[data-cy=titleMatch]').contains('List of Candidates who meet a profile')
      cy.get('[data-cy=subTitleMatch]').contains('The candidates meet, at a minimum, the following abilities:')
      cy.get('[data-cy=lstSkillsMatch]').contains('JavaScript')
      //cy.get('[data-cy=lstCandMatch]').should('')
      //cy.get('[data-cy=backMatch]').click()

    })

  })
