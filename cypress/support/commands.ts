/// <reference types="cypress" />

Cypress.Commands.add('searchQuery', (query: string) => {
  cy.visit('/');
  cy.get('input[name=q]').type(query).parent('form').submit();
});

declare namespace Cypress {
  interface Chainable {
    searchQuery(email: string): Chainable<void>;
  }
}
