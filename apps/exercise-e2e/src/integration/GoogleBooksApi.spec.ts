describe('exercise', () => {
  beforeEach(() => cy.visit('/'));
  it('Book search and filtering', () => {
    
    cy.visit('http://localhost:4200/books')
    cy.get('.form-control').type('Lebanon{enter}')
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiSelect-root').select('Partial')
    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiSelect-root').select('Magazines')
    cy.get(':nth-child(3) > .MuiInputBase-root > .MuiSelect-root').select('Newest')
  });
  
});
