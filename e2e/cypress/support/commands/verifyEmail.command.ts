function verifyEmail(email: string): Cypress.Chainable<any> {
  return cy.request('POST', `${Cypress.env('API_URL')}/user/verifyEmail`, { email });
}

Cypress.Commands.add('verifyEmail', verifyEmail);

declare global {
  namespace Cypress {
    interface Chainable {
      verifyEmail: typeof verifyEmail;
    }
  }
}

export {};
