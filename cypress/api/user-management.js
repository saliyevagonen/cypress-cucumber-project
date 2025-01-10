describe('User Management Page', () => {
  
    // Test Objective 1: Intercept the network request
    it('should intercept the API request to fetch users and verify request/response details', () => {
      // Intercept the API call
      cy.intercept('GET', '/api/users', (req) => {
        // Verify the request URL and method
        expect(req.method).to.equal('GET');
        expect(req.url).to.include('/api/users');
      }).as('fetchUsers'); // Alias for later reference
  
      // Visit the User Management page
      cy.visit('/user-management');
  
      // Wait for the API request and validate the response
      cy.wait('@fetchUsers').then((interception) => {
        // Check if the response status is 200
        expect(interception.response.statusCode).to.equal(200);
  
        // Verify the structure of the response body
        expect(interception.response.body).to.be.an('array');
        interception.response.body.forEach(user => {
          expect(user).to.have.all.keys('id', 'name', 'email');
        });
      });
    });
  
    // Test Objective 2: Use cy.request() to validate API data matches frontend
    it('should fetch users via cy.request() and compare data with frontend', () => {
      // Make a direct API request
      cy.request('GET', '/api/users').then((response) => {
        // Validate the API response
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        const apiUsers = response.body;
  
        // Visit the User Management page
        cy.visit('/user-management');
  
        // Validate that data displayed on the frontend matches API data
        cy.get('[data-testid="user-row"]').each(($el, index) => {
          const apiUser = apiUsers[index];
          cy.wrap($el).within(() => {
            cy.get('[data-testid="user-id"]').should('have.text', apiUser.id);
            cy.get('[data-testid="user-name"]').should('have.text', apiUser.name);
            cy.get('[data-testid="user-email"]').should('have.text', apiUser.email);
          });
        });
      });
    });
  });
  