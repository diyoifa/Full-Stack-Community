describe('when visiting', () => {
  it('page open', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Full-Stack Community')
  })
})