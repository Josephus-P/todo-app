describe('Login Page', () => {
  it('takes a user to the /todo page after login, signs out and returns to the /login page', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    cy.visit('/login');

    cy.get('input[name=email]').type(email);

    cy.get('input[name=password]').type(`${password}{enter}`);

    cy.url().should('include', '/todo');

    cy.contains('Sign Out').click();

    cy.url().should('include', '/login');
  });
});
