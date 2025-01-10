 /*
    Problem 2: The provided TestPage-Targets.html file includes the following functionality:

     Users can add targets from a list of three options: Cells, Nuclei, and Organelles. 
     Once three targets have been added, the Execute button becomes enabled. Task:

    2. Implement one of the Cucumber steps from one of the scenarios by choice in Cypress (i.e. implementation of ‘When’ step).
 */

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import '@4tw/cypress-drag-drop';

Given('the user is on the "Table Row Addition" page', () => {
  // Navigate to the Targets Page
  cy.visit("cypress/TestPage-Targets.html");
});

When("the user selects the target name {string}", (target_name) => {
    cy.get("#targetName").select(target_name); // Click the "Target Name" dropdown
});

And('the user clicks on the "Add Row" button', () => {
  cy.get("#addRowBtn").click(); // Click the "Add Row" button
});

Then("the target {string} should be added to the list", (target_name) => {
  cy.get("#tableBody tr").last().should("contain.text", target_name); // Check if the last row contains the target name
});

And('the "Execute" button should be {string}', (button_status) => {
  if (button_status === "enabled") {
    cy.get("#executeBtn").should("be.enabled"); // Ensure the button is enabled
  } else {
    cy.get("#executeBtn").should("be.disabled"); // Ensure the button is disabled
  }
});


/*
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
*/ 

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


  When('the user adds the following targets:', (dataTable) => {
    const targetNames = dataTable.hashes(); // Convert the dataTable to an array of rows
    targetNames.forEach((row) => {
      const targetName = row['Target Name']; // Extract the target name from the table
      cy.get('#targetName').select(targetName); // Select the target name from dropdown
      cy.get('#addRowBtn').click(); // Click the "Add Row" button to add the row
    });
  });

  
