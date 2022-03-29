// Telecom add tariff plane.js.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Guru99 demo telecom app', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addtariffplans.php')
  })

//Tariff Plan can be added with valid data
  it('All elements are visible and fields are blank', () => {
    cy.get('#rental1').should('be.visible').should('have.value', '')
    cy.get('#local_minutes').should('be.visible').should('have.value', '')
    cy.get('#inter_minutes').should('be.visible').should('have.value', '')
    cy.get('#sms_pack').should('be.visible')
    cy.get('#minutes_charges').should('be.visible').should('have.value', '')
    cy.get('#inter_charges').should('be.visible')
    cy.get('#sms_charges').should('be.visible').should('have.value', '')
    cy.get('[type="submit"]').should('exist').should('be.visible')
    cy.get('[type="reset"]').should('exist').should('be.visible')
  })

   it('Submit with all fields filled with correct data', () => { 
    cy.get('#rental1').type('99999')
    cy.get('#local_minutes').type('257')
    cy.get('#inter_minutes').type('1')
    cy.get('#sms_pack').type('20')
    cy.get('#minutes_charges').type('1')
    cy.get('#inter_charges').type('999')
    cy.get('#sms_charges').type('514')
    cy.get('input[name="submit"]').click()
    cy.contains('Congratulation you add Tariff Plan').should('be.visible')
  })


//Verify field validation
   it("Validation: can't use negative number", () => {

   	const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('#rental1').type('-99999')
    cy.get('#local_minutes').type('-257')
    cy.get('#inter_minutes').type('-1')
    cy.get('#sms_pack').type('-20')
    cy.get('#minutes_charges').type('-1')
    cy.get('#inter_charges').type('-999')
    cy.get('#sms_charges').type('-514')
    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields Correct Value')
    })
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })

   it("Validation: can't use zero", () => {

    const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('#rental1').type('0')
    cy.get('#local_minutes').type('0')
    cy.get('#inter_minutes').type('0')
    cy.get('#sms_pack').type('0')
    cy.get('#minutes_charges').type('0')
    cy.get('#inter_charges').type('0')
    cy.get('#sms_charges').type('0')
    cy.get('input[name="submit"]').click()
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')

    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields Correct Value')
    })
  })

   	it("Validation: can't use special symbols", () => { 

   	const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('#rental1').type('!0')
    cy.get('#local_minutes').type('$0')
    cy.get('#inter_minutes').type('@0')
    cy.get('#sms_pack').type('(25)')
    cy.get('#minutes_charges').type('=0')
    cy.get('#inter_charges').type('*22')
    cy.get('#sms_charges').type('1222!')
    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields Correct Value')
    })
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })

   	it("Validation: can't use letters", () => { 
   	const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.get('#rental1').type('f0')
    cy.get('#local_minutes').type('k0')
    cy.get('#inter_minutes').type('sd0')
    cy.get('#sms_pack').type('ll0')
    cy.get('#minutes_charges').type('sd0')
    cy.get('#inter_charges').type('dd0')
    cy.get('#sms_charges').type('WW0')
    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields Correct Value')
    })
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })

   	it("Validation: fields can't be blank", () => { 

   	const stub = cy.stub()
    cy.on('window:alert', stub) 

    cy.fieldsAreEmptyCheck()

    cy.get('input[name="submit"]').click().then(() => {
      expect(stub).to.be.calledWith('please fill all fields Correct Value')
    })
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })


//Reset button functionality
   it('Reset with all fields filled with correct data', () => { 
    cy.get('#rental1').type('99999')
    cy.get('#local_minutes').type('257')
    cy.get('#inter_minutes').type('1')
    cy.get('#sms_pack').type('20')
    cy.get('#minutes_charges').type('1')
    cy.get('#inter_charges').type('999')
    cy.get('#sms_charges').type('514')
    cy.get('input[type="reset"]').click()
	cy.fieldsAreEmptyCheck()
    cy.get('input[name="submit"]').click()
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })

   it('Reset with all fields filled with incorrect data and then submit', () => { 
    cy.get('#rental1').type('0')
    cy.get('#local_minutes').type('-257')
    cy.get('#inter_minutes').type('!')
    cy.get('#sms_pack').type('five')
    cy.get('#minutes_charges').type('null')
    cy.get('#inter_charges').type('-122')
    cy.get('#sms_charges').type('9999111')
    cy.get('input[type="reset"]').click()
    cy.fieldsAreEmptyCheck()
    cy.get('input[name="submit"]').click()
    cy.contains('Congratulation you add Tariff Plan').should('not.exist')
  })

})