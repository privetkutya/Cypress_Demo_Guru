describe('Fields validation at Guru99 demo Telecom, add user page', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addcustomer.php')
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