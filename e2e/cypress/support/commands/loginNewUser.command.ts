import { getUser } from '../data';
import { User } from '../interfaces';

function loginNewUser(user: User = getUser()): Cypress.Chainable<any> {
  cy.visit('/');

  cy.get('#signup-name').type(user.name);
  cy.get('#signup-email').type(user.email);
  cy.get('#signup-password').type(user.password);
  cy.get('#signup-button').click();

  const baseUrl = Cypress.config('baseUrl');
  cy.url().should('eq', `${baseUrl}/verify`);
  cy.verifyEmail(user.email);
  cy.get('#verify-done-button').click();

  cy.url().should('eq', `${baseUrl}/login`);
  cy.get('#login-email').type(user.email);
  cy.get('#login-password').type(user.password);
  cy.get('#login-button').click();

  cy.url().should('eq', `${baseUrl}/contacts`);

  return cy;
}

Cypress.Commands.add('loginNewUser', loginNewUser);

declare global {
  namespace Cypress {
    interface Chainable {
      loginNewUser: typeof loginNewUser;
    }
  }
}

export {};
