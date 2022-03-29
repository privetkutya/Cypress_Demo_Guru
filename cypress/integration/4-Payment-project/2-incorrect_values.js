describe('Payment with incorrect values at Guru99 Payment Getaway app', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php')
  })

 //incorrect values

  	it('Card number is too long(20 digits)', () => {
        cy.add2Items()
        cy.get('#card_nmuber').type('12345678901234567890')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('123')
        expect('#card_nmuber').to.equal('1234567890123456')
        cy.get('.button').click()
        cy.contains('Payment successfull!').should('be.visible')
        cy.contains('Order ID').should('be.visible')
    })

    it('Card number is too short(12 digits)', () => {
 		const stub = cy.stub()
    	cy.on('window:alert', stub) 

        cy.add2Items()
        cy.get('#card_nmuber').type('123456789012')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
        cy.contains('Payment successfull!').should('not.exist')
    })


  	it('All card fields are empty', () => {
  		
  		const stub = cy.stub()
    	cy.on('window:alert', stub) 

  		cy.add2Items()
  		cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
  		cy.contains('Payment successfull!').should('not.exist')
 	})

  	it('Expiration year is not chosen', () => {
        cy.add2Items()

		const stub = cy.stub()
    	cy.on('window:alert', stub)

        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="month"]').select('03')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
  		cy.contains('Payment successfull!').should('not.exist')
    })

  	it('Expiration month is not chosen', () => {
        cy.add2Items()

		const stub = cy.stub()
    	cy.on('window:alert', stub)
    	 
        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="year"]').select('2024')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
  		cy.contains('Payment successfull!').should('not.exist')
    })

	it('Incorrect CVV(too short)', () => {
        cy.add2Items()
		
		const stub = cy.stub()
    	cy.on('window:alert', stub)
    	 
        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('1')
        cy.get('.button').click()
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called })
        cy.contains('Payment successfull!').should('not.exist')
    })

    it('CVV is not chosen', () => {
        cy.add2Items()

		const stub = cy.stub()
    	cy.on('window:alert', stub)

        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('1')
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called })
        cy.contains('Payment successfull!').should('not.exist')
    })


    it('Should be blocked after 3 attempts', () => {
        cy.add2Items()

        const stub = cy.stub()
    	cy.on('window:alert', stub)

        cy.get('#card_nmuber').type('12345678901234567890')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click()
        cy.wait(200)
        cy.get('.button').click()
        cy.wait(200)
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
    	//code that user can't make attempts anymore
        cy.contains('Payment successfull!').should('not.exist')
    })

    it("It's not possible to pay with expired card", () => {
        cy.add2Items()

        const stub = cy.stub()
    	cy.on('window:alert', stub)

        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="month"]').select('02')
        cy.get('select[name="year"]').select('2022')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click().then(() => {
      		expect(stub).to.be.called
    	})
        cy.contains('Payment successfull!').should('not.exist')
    })
})

//checking for alert
/*  	const stub = cy.stub()
    	cy.on('window:alert', stub) 

  		cy.get('.button').click().then(() => {
      		expect(stub).to.be.calledWith('Выберите один из пунктов списка')
    	})*/