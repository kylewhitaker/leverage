import { getContact } from '../data/contact.data';
import { Contact } from '../interfaces';

function addContact(contact: Contact = getContact()): Cypress.Chainable<any> {
  cy.visit('/contacts');
  cy.get('#button-add-new-contact').click();

  const baseUrl = Cypress.config('baseUrl');
  cy.url().should('eq', `${baseUrl}/new-contact`);

  cy.get('#new-contact-name').type(contact.name);
  cy.get('#new-contact-email').type(contact.email);
  cy.get('#new-contact-phone').type(contact.phone);
  cy.get('#new-contact-button').click();

  cy.url().should('eq', `${baseUrl}/contacts`);
  cy.get('#contact-name-0').should('contain', contact.name);
  cy.get('#contact-email-0').should('contain', contact.email);
  cy.get('#contact-phone-0').should('contain', contact.phone);

  return cy;
}

Cypress.Commands.add('addContact', addContact);

declare global {
  namespace Cypress {
    interface Chainable {
      addContact: typeof addContact;
    }
  }
}

export {};
