function verifyEmail(email: string): Cypress.Chainable<any> {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/user/verifyEmail`,
    body: { email },
    headers: { authorization: Cypress.env('API_KEY') },
  });
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
