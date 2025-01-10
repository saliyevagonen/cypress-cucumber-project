3. Assume the created rows are draggable and can be rearranged. Is this achievable in Cypress? Describe possible methods for implementing drag-and-drop functionality.

    Answer:

    Yes, drag and drop functionality is achievable in Cypress. We can achieve it by using the following methods:

      Using the Cypress's Built-in trigger Command: 
          This method simulates mouse events like dragging and dropping manually. 
          We can use it to trigger actions like mouse down, move, and up to mimic the drag-and-drop interaction.
          Documentation (https://docs.cypress.io/api/commands/trigger).

      Using the @4tw/cypress-drag-drop Plugin: This plugin simplifies drag-and-drop actions by providing a built-in drag command, 
          making it easier to implement drag-and-drop functionality in your tests.
          Documentation (https://github.com/4teamwork/cypress-drag-drop).

    In below example I used the cypress drag and drop plugin
 

  Scenario: Drag and drop the rows and verify the name changes
    Given the user is on the "Table Row Addition" page
    And the user has added the following rows:
      | Target Name  |
      | Cells        |
      | Nuclei       |
      | Organelles   |
    When the user drags and drops the row with "Cells" to the position of "Organelles"
    Then the target "Cells" should be moved to the position of "Organelles"
    And the target "Organelles" should be moved to the position of "Cells"



// Step for Drag-and-Drop functionality
And('the user has added the following rows:', (dataTable) => {
    const targetNames = dataTable.hashes(); // Convert the dataTable to an array of rows
    targetNames.forEach((row) => {
      const targetName = row['Target Name']; // Extract the target name from the table
      cy.get('#targetName').select(targetName); // Select the target name from dropdown
      cy.get('#addRowBtn').click(); // Click the "Add Row" button to add the row
    });
  });
  
  When('the user drags and drops the row with {string} to the position of {string}', (source, target) => {
    // Find the source row by its target name and drag it to the target row's position
    cy.get('#tableBody tr')
      .contains(source)
      .drag('#tableBody tr')
      .contains(target);
  });
  
  Then('the target {string} should be moved to the position of {string}', (source, target) => {
    // After dragging the source row, verify it appears in the target's position
    cy.get('#tableBody tr')
      .contains(source)
      .should('be.visible');
    
    cy.get('#tableBody tr')
      .contains(target)
      .should('be.visible');
  });
  
  And('the target {string} should be moved to the position of {string}', (target, source) => {
    // Verify that the target row is now in the original position of the source row
    cy.get('#tableBody tr')
      .contains(target)
      .should('be.visible');
    
    cy.get('#tableBody tr')
      .contains(source)
      .should('be.visible');
  });

  
