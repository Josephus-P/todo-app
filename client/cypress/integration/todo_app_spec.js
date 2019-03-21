describe('Todo App', () => {
  it('Logs in and takes a user to the /todo page', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    cy.visit('/login');

    cy.get('input[name=email]')
      .type(email)
      .should('have.value', email);

    cy.get('input[name=password]')
      .type(`${password}{enter}`)
      .should('have.value', password);

    cy.url().should('include', '/todo');

    cy.contains('Sign Out');
  });

  it('Takes a user to /todo/new and adds a todo', () => {
    cy.contains('Add Todo').click();

    cy.url().should('include', '/todo/new');

    cy.get('input[name=title]')
      .type('Cypress Todo')
      .should('have.value', 'Cypress Todo');

    cy.get('textarea[name=description]')
      .type(`This is a Cypress todo test.`)
      .should('have.value', 'This is a Cypress todo test.');

    cy.contains('Add Todo').click();

    cy.contains('Sign Out');

    cy.contains('Cypress Todo');
    cy.contains('This is a Cypress todo test.');
  });

  it('Lets a user edit a Todo and then go to the /todo page', () => {
    cy.contains('Edit').click();

    cy.get('input[name=title]')
      .clear()
      .type('Editted Cypress Todo')
      .should('have.value', 'Editted Cypress Todo');

    cy.get('textarea[name=description]')
      .clear()
      .type(`This is an editted Cypress todo test.`)
      .should('have.value', 'This is an editted Cypress todo test.');

    cy.contains('Update').click();

    cy.contains('Editted Cypress Todo');
    cy.contains('This is an editted Cypress todo test.');

    cy.contains('Todo App').click();
  });

  it('Shows the added/updated todo in a list', () => {
    cy.contains('Editted Cypress Todo');
    cy.contains('View');
  });

  it('Deletes a todo', () => {
    cy.get('[type=checkbox]')
      .last()
      .check();
    cy.contains('Delete').click();
  });

  it('Signs out of the app', () => {
    cy.contains('Sign Out').click();
    cy.url().should('include', '/login');
  });
});
