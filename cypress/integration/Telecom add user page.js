// homepage.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Guru99 demo telecom app', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
  })

//positive tests
  it('All elements are visible and fields are blank', () => {
    cy.contains('Background Check').should('be.visible')
    cy.get('#fname').should('be.visible').should('have.value', '')
    cy.get('#lname').should('be.visible').should('have.value', '')
    cy.get('#email').should('be.visible').should('have.value', '')
    cy.get(':nth-child(7) > #message').should('be.visible')
    cy.get('#telephoneno').should('be.visible').should('have.value', '')
    cy.get('[type="submit"]').should('exist').should('be.visible')
    cy.get('[type="reset"]').should('exist').should('be.visible')
  })

  it('Full Background Check functionality check', () => {
    cy.contains('Background Check').should('be.visible')
    cy.get('input#done').should('exist')
    cy.get('input#pending').should('exist')
    cy.get('label[for="done"]').click()
    cy.get('input#done').should('be.checked')
    cy.get('input#pending').should('not.be.checked')
    cy.get('label[for="pending"]').click()
    cy.get('input#pending').should('be.checked')
    cy.get('input#done').should('not.be.checked')
  })

  it('Submit with all fields filled and DONE radio button', () => { 
    //тут была ошибка ReferenceError: v6 is not defined
    //но всё работало с ней, поэтому я использовала cy.on('uncaught:exception'
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.get('label[for="done"]').click()
    cy.correctUserInfo()
    cy.get('input[name="submit"]').click()
    cy.url().should('contain', 'https://demo.guru99.com/telecom/access.php?uid=')
  })

  it('Submit with all fields filled and PENDING radio button', () => { 
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.get('label[for="pending"]').click()
    cy.correctUserInfo()
    cy.get('input[name="submit"]').click()
    cy.url().should('contain', 'https://demo.guru99.com/telecom/access.php?uid=')
  })

  it('Reset button', () => {
    cy.get('label[for="done"]').click()
    cy.correctUserInfo()
    cy.get('input[type="reset"]').click()
    cy.get('input#done').should('not.be.checked')
    cy.get('#fname').should('have.value', '')
    cy.get('#lname').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get(':nth-child(7) > #message').should('have.value', '')
    cy.get('#telephoneno').should('have.value', '')
  })

//negative tests
 it('It is not possible to submit with invalid data', () => { 
    cy.get('label[for="done"]').click()
    cy.notCorrectUserInfo()
    cy.get('input[name="submit"]').click()
    cy.get('#message').should('have.text', 'Special characters are not allowed').and('be.visible')
    cy.get('#message50').should('have.text', 'Special characters are not allowed').and('be.visible')
    cy.get('#message9').should('have.text', 'Email-ID is not valid').and('be.visible')
    cy.get('#message3').should('have.text', 'Special characters are not allowed').and('be.visible')
    cy.get('#message7').should('have.text', 'Characters are not allowed').and('be.visible')
  })

  it('Submit with blank fields is not possible', () => {
    cy.get('input[name="submit"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('please fill all fields')
    })   
  })  

it('Submit after reset fields filled with valid data is not possible', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    //cy.on('window:alert', (str) => {
    //  expect(str).to.equal('please fill all fields')
    //}) 

    const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('label[for="done"]').click()
    cy.correctUserInfo()
    cy.get('input[type="reset"]').click()
    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.called
    })
  })


  it('Submit after reset fields filled with invalid data is not possible', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('label[for="done"]').click()
    cy.notCorrectUserInfo()
    cy.get('input[type="reset"]').click()
    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields')
    })
  })

  it('"Must not be blank" messages under every field after clicking it', () => { 
    cy.get('#fname').click()
    cy.get('#lname').click()
    cy.get('#email').click()
    cy.get(':nth-child(7) > #message').click()
    cy.get('#telephoneno').click()
    cy.get('#fname').click()
    cy.get('#message').should('have.text', 'Customer name must not be blank').and('be.visible')
    cy.get('#message50').should('have.text', 'Customer name must not be blank').and('be.visible')
    cy.get('#message9').should('have.text', 'Email-ID must not be blank').and('be.visible')
    cy.get('#message3').should('have.text', 'Address Field must not be blank').and('be.visible')
    cy.get('#message7').should('have.text', 'Mobile no must not be blank').and('be.visible')
  })
})