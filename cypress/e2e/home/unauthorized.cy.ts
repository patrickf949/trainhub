describe('homepage testing', () => {
    beforeEach(() => {
      // clear any existing 
      sessionStorage.clear();
      cy.visit('/')
    })
    it('displays access button', () => {
      // access button should be available for users without access
      cy.get('button').should('have.length', 1)
      cy.get('button').first().should('have.text', 'Click to Access')
    })

})
