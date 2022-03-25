describe('Guru99 demo telecom app', () => {
	beforeEach(() => {
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/')
        //в случае использования cookie
		//cy.getIframeBody().find('button#save', { timeout: 10 * 1000 }).click() 
	})


    it('Successfull login', () => {
        cy.getUserNameAndPassword().then(credentials => {
            cy.get('input[name="uid"]')
            .scrollIntoView()
            //.should('be.visible')
            .type(credentials.userID);
            cy.get('input[name="password"]').type(credentials.password);
            cy.get('input[name="btnLogin"]').click()
            //https://demo.guru99.com/Agile_Project/Agi_V1/customer/Customerhomepage.php
   		})
    })
})
