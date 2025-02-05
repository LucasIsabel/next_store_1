describe('search product', () => {
  it('should be able to search a product', () => {
    cy.searchQuery('moletom');

    cy.location('pathname').should('include', '/search');
    cy.location('search').should('include', 'q=moletom');

    cy.get('a[href*="/products"]').first().click();
    cy.get('button').contains('Adicionar ao carrinho').click();
    cy.contains('Cart (1)').should('exist');
  });

  it('should not let user visit page if no query param exist', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });

    cy.visit('/search');

    cy.location('pathname').should('not.equal', 'q=moletom');
  });
});
