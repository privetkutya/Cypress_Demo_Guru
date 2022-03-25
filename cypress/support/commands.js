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
