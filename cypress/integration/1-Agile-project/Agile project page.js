describe('Guru99 demo Agile project', () => {
	beforeEach(() => {
		cy.visit('https://demo.guru99.com/Agile_Project/Agi_V1/')
        //в случае использования cookie
		//cy.getIframeBody().find('button#save', { timeout: 10 * 1000 }).click() 
	})

    //Tariff Plan can be added with valid data
    it('All elements are visible and fields are blank', () => {
        cy.contains('Guru99 Bank').should('be.visible')
        cy.contains('UserID').should('be.visible')
        cy.contains('Password').should('be.visible')
        cy.get('input[name="uid"]').should('be.visible').and('have.value', '')
        cy.get('input[name="password"]').should('be.visible').and('have.value', '')
        cy.get('input[name="btnLogin"]').should('be.visible')
        cy.get('input[name="btnReset"]').should('be.visible')
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

    //can't check this because of strange error window behaviour
    /* it('Login with wrong password is not possible', () => {

        const stub = cy.stub()
        cy.on('window:alert', stub) 

        cy.getUserNameAndPassword().then(credentials => {
            cy.get('input[name="uid"]').scrollIntoView().type(credentials.userID);
            cy.get('input[name="password"]').type('gURU99');
            cy.get('input[name="btnLogin"]').then(() => {
                expect(stub).to.be.calledWith('User or Password is not valid')
            })
            //https://demo.guru99.com/Agile_Project/Agi_V1/customer/Customerhomepage.php
        })


    })

    it('Login with wrong login is not possible', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.getUserNameAndPassword().then(credentials => {
            cy.get('input[name="uid"]').type('1304');
            cy.get('input[name="password"]').type(credentials.password);
            cy.get('input[name="btnLogin"]').then(() => {
                expect(stub).to.be.calledWith('User or Password is not valid')
            })
            //https://demo.guru99.com/Agile_Project/Agi_V1/customer/Customerhomepage.php
        })
    }) */
})
