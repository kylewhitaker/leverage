describe('Sample', () => {
  it('test', () => {
    cy.visit('http://localhost:3000');
    cy.get('a').should('contain', 'Learn React');
  });
});
