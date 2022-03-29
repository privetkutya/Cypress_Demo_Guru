describe('Successfull path at Guru99 demo Telecom, add user page', () => {
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
})