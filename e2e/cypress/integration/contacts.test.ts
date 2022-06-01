import { getContact } from '../support/data/contact.data';

describe('Contacts', () => {
  it('add new', () => {
    cy.visit('/');

    cy.loginNewUser();

    cy.visit('/contacts');
    cy.get('#button-add-new-contact').click();

    const baseUrl = Cypress.config('baseUrl');
    cy.url().should('eq', `${baseUrl}/new-contact`);

    const contact = getContact();
    cy.get('#new-contact-name').type(contact.name);
    cy.get('#new-contact-email').type(contact.email);
    cy.get('#new-contact-phone').type(contact.phone);
    cy.get('#new-contact-button').click();

    cy.url().should('eq', `${baseUrl}/contacts`);
    cy.get('#contact-name-0').should('contain', contact.name);
    cy.get('#contact-email-0').should('contain', contact.email);
    cy.get('#contact-phone-0').should('contain', contact.phone);
  });
});
