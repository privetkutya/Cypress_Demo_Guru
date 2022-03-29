//Agile project page

Cypress.Commands.add('getUserNameAndPassword', () =>{
	cy.contains('li', 'UserID').then(jqElement => {
		const userID = jqElement.text().split(':')[1].trim();

		cy.contains('li', 'Password').then(jqElement => {
			const password = jqElement.text().split(':')[1].trim( );
			return{
				userID,
				password
			}
		})
	})
})

Cypress.Commands.add('getIframeBody', () =>{ //извлечение документа из iframe, чтобы с ним можно было работать
  const getIframeDocument = cy
     .get('iframe#gdpr-consent-notice')
     .its('0.contentDocument').should('exist')

    return getIframeDocument
    // automatically retries until body is loaded
    .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap)
    //.scrollIntoView()
    .wait(1000)
})

//Telecom add user page
Cypress.Commands.add('correctUserInfo', () =>{
    cy.get('#fname').type('Sarra')
    cy.get('#lname').type('Parker')
    cy.get('#email').type('sarra@mail.com')
    cy.get(':nth-child(7) > #message').type('10021 New york Manhetten 245 East 73rd Street')
    cy.get('#telephoneno').type('+12888198')
})

Cypress.Commands.add('notCorrectUserInfo', () =>{
    cy.get('#fname').type('Sarra!')
    cy.get('#lname').type('Pa*rker')
    cy.get('#email').type('sarra@mail.')
    cy.get(':nth-child(7) > #message').type('! New York')
    cy.get('#telephoneno').type('My number')
})

//Telecom add tariff plan
Cypress.Commands.add('fieldsAreEmptyCheck', () =>{
    cy.get('#rental1').should('be.visible').should('have.value', '')
    cy.get('#local_minutes').should('be.visible').should('have.value', '')
    cy.get('#inter_minutes').should('be.visible').should('have.value', '')
    cy.get('#sms_pack').should('be.visible')
    cy.get('#minutes_charges').should('be.visible').should('have.value', '')
    cy.get('#inter_charges').should('be.visible')
    cy.get('#sms_charges').should('be.visible').should('have.value', '')
})

//Payment getaway
Cypress.Commands.add('add2Items', () =>{
    cy.get('select[name="quantity"]').select('2')
    cy.get('input[type="submit"]').click()
})


