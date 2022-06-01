import { getContact } from '../support/data/contact.data';

describe('Contacts', () => {
  it('add new', () => {
    cy.visit('/');
    cy.loginNewUser();
    cy.addContact();
  });

  it('delete', () => {
    cy.visit('/');
    cy.loginNewUser();
    cy.addContact();

    cy.get('#contact-delete-0').click();

    const baseUrl = Cypress.config('baseUrl');
    cy.url().should('eq', `${baseUrl}/contacts`);
    cy.get('#contact-name-0').should('not.exist');
  });
});
