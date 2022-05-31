import { getUser } from '../support/data';

describe('User', () => {
  it('register and login', () => {
    cy.visit('/');

    const user = getUser();
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
  });
});
