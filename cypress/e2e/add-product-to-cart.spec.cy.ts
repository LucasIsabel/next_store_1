describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to navigate to product page and add one product into cart', () => {
    cy.get('a[href*="products"]').first().click();
    cy.location('pathname').should('include', '/products');
    cy.get('button').contains('Adicionar ao carrinho').click();
    cy.contains('Cart (1)').should('exist');
  });

  it('should not count duplicated when click on item twice', () => {
    cy.get('a[href*="products"]').first().click();
    cy.location('pathname').should('include', '/products');
    cy.get('button').contains('Adicionar ao carrinho').click();
    cy.get('button').contains('Adicionar ao carrinho').click();
    cy.contains('Cart (1)').should('exist');
  });

  it('should search for a product and click on search', () => {
    cy.get('input[name="q"]').type('moletom').parent().submit();
    cy.location('pathname').should('include', '/search');

    cy.get('a[href*="products"]').first().click();
    cy.get('button').contains('Adicionar ao carrinho').click();
    cy.contains('Cart (1)').should('exist');
  });
});
