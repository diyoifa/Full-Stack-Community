describe('login component', () => {
    beforeEach(()=> {
        cy.visit('http://localhost:5173/')
        cy.request('DELETE', 'http://localhost:3001/api/testing/reset')
        cy.createUser({username: 'test', email:'test@gmail.com', password:'123'})
        window.localStorage.removeItem('user')

    })
    it('form can be opened', () => {
        cy.contains('Login').click()
    })
    it('login fails with wrong credentials', () => {
        cy.contains('Login').click()
        cy.get('[placeholder = "username"] ').type('wrong user')
        cy.get('[placeholder = "password"]').type('wrong password')
        cy.get('#form-login-btn').click()
        cy.contains('Wrong Credentials')
    })
    it('login success with right credentials', () => {
        cy.contains('Login').click()
        cy.get('[placeholder = "username"]').type('test')
        cy.get('[placeholder = "password"]').type('123')
        cy.get('#form-login-btn').click()
        cy.contains('Login success')
    })
})