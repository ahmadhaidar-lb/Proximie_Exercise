describe('exercise', () => {
    beforeEach(() => cy.visit('/'));
    
    it('Weather testing',()=>{
      cy.visit('http://localhost:4200/weather')
      cy.get('[name="city"]').type('saida{enter}');
      cy.get('[name="country"]').type('Lebanon{enter}')
    })
  });
  