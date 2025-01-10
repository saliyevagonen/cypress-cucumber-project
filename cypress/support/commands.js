
// Command to intercept and validate the API request
Cypress.Commands.add('validateUserApiRequest', (apiEndpoint) => {
    cy.intercept('GET', apiEndpoint).as('getUsers');
    cy.visit('/user-management');
    cy.wait('@getUsers').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('users');
      expect(interception.response.body.users).to.be.an('array');
    });
  });

// Command to validate frontend data against the API response
Cypress.Commands.add('validateFrontendWithApi', (apiEndpoint, selector) => {
    cy.request('GET', apiEndpoint).then((response) => {
      expect(response.status).to.eq(200);
      const users = response.body.users;
      cy.get(selector).each(($el, index) => {
        cy.wrap($el).should('contain.text', users[index].name);
        cy.wrap($el).should('contain.text', users[index].email);
      });
    });
  });