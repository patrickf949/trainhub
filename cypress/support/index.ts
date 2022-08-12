/// <reference types="cypress" />
// cypress/support/index.ts
// Cypress.Commands.add("dataCy", (value) => {
//   return cy.get(`[data-cy=${value}]`);
// });
// in cypress/support/index.ts
// load type definitions that come with Cypress module


declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Element>;
    }
  }
}
