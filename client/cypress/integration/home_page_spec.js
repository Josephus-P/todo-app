describe('Home Page', () => {
  it('takes the user to the login page after clicking login', () => {
    cy.visit('/');

    cy.contains('Login').click();

    cy.url().should('include', '/login');
  });

  it('takes the user to the register page after clicking signup', () => {
    cy.visit('/');

    cy.contains('Signup').click();

    cy.url().should('include', '/register');
  });
});
