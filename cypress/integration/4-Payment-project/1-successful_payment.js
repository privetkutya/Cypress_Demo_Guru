describe('Successfull payment at Guru99 Payment Getaway app', () => {
  beforeEach(() => {
    cy.visit('https://demo.guru99.com/payment-gateway/purchasetoy.php')
  })

   /*  */

//positive test cases

  	it('All elements are visible and fields are blank', () => {
        cy.contains('Guru99 Payment Gateway').should('be.visible')
        cy.contains('Price').should('be.visible')
        cy.contains('Quantity').should('be.visible')
        cy.get('select[name="quantity"]').should('be.visible')
        //cy.get('option[value="n"]').should('be.visible').should('have.text', 'n')
        var genArr = Array.from({length:9},(v,k)=>k+1)
			cy.wrap(genArr).each((index) => {
    		cy.get('option[value=' + index +']').should('be.visible').should('have.text', index)
		})
		cy.get('input[type="submit"]').should('have.value', 'Buy Now')
   })

  	it('Successfull path', () => {
        cy.add2Items()
        cy.get('#card_nmuber').type('1234567890123456')
        cy.get('select[name="month"]').select('03')
        cy.get('select[name="year"]').select('2028')
        cy.get('#cvv_code').type('123')
        cy.get('.button').click()
        cy.contains('Payment successfull!').should('be.visible')
        cy.contains('Order ID').should('be.visible')
    })
})

//checking for alert
/*  	const stub = cy.stub()
    	cy.on('window:alert', stub) 

  		cy.get('.button').click().then(() => {
      		expect(stub).to.be.calledWith('Выберите один из пунктов списка')
    	})*/