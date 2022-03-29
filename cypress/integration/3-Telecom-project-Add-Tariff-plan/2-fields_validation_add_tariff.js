describe('Fields validation at Guru99 demo Telecom, add tariff plan', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/telecom/addtariffplans.php')
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
})