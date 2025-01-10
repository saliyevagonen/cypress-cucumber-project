# Problem 2: The provided TestPage-Targets.html file includes the following functionality:

#  Users can add targets from a list of three options: Cells, Nuclei, and Organelles. 
#  Once three targets have been added, the Execute button becomes enabled. Task:

# 1. Create parameterized Cucumber scenario(s) to test these requirements.


Feature: Table Row Addition with Target Names
  Background: 
    Given the user is on the "Table Row Addition" page

    Scenario: Add targets and verify the Execute button status after each row is added
      When the user selects the target name "Cells"
      And the user clicks on the "Add Row" button
      Then the target "Cells" should be added to the list
      And the "Execute" button should be "disabled"

      When the user selects the target name "Nuclei"
      And the user clicks on the "Add Row" button
      Then the target "Nuclei" should be added to the list
      And the "Execute" button should be "disabled"

      When the user selects the target name "Organelles"
      And the user clicks on the "Add Row" button
      Then the target "Organelles" should be added to the list
      And the "Execute" button should be "enabled"



Scenario Outline: Add three targets to enable the Execute button
  When the user adds the following targets:
    | Target Name |
    | <target>    |
    | <target2>   |
    | <target3>   |
  Then the "Execute" button should be "enabled"

  Examples:
    | target      | target2    | target3     |
    | Cells       | Nuclei     | Organelles  |
    | Organelles  | Cells      | Nuclei      |
    | Nuclei      | Cells      | Organelles  |
    | Cells       | Organelles | Nuclei      |
    | Organelles  | Nuclei     | Cells       |
    | Nuclei      | Organelles | Cells       |



# Note: If the page state doesn't reset after each test, it's best to use the following test structure.

# Feature: Table Row Addition with Target Names

#   # Scenario Outline to add targets and verify button status after each row
#   Scenario Outline: Add targets and verify the Execute button status after each row is added
#     Given the user is on the "Table Row Addition" page
#     When the user selects the target name "<target_name>"
#     And the user clicks on the "Add Row" button
#     Then the target "<target_name>" should be added to the list
#     And the "Execute" button should be "<button_status>"

#   Examples:
#     | target_name | button_status |
#     | Cells       | disabled      |
#     | Nuclei      | disabled      |
#     | Organelles  | enabled       |



# 3. Assume the created rows are draggable and can be rearranged. Is this achievable in Cypress? Describe possible methods for implementing drag-and-drop functionality.

# Answer:

# Yes, drag and drop functionality is achievable in Cypress. We can achieve it by using the following methods:

# Using the Cypress's Built-in trigger Command: 
    # This method simulates mouse events like dragging and dropping manually. 
    # We can use it to trigger actions like mouse down, move, and up to mimic the drag-and-drop interaction.
    # Documentation (https://docs.cypress.io/api/commands/trigger).

# Using the @4tw/cypress-drag-drop Plugin: This plugin simplifies drag-and-drop actions by providing a built-in drag command, 
    # making it easier to implement drag-and-drop functionality in your tests.
    # Documentation (https://github.com/4teamwork/cypress-drag-drop).

# In below example I used the cypress drag and drop plugin

# Scenario: Drag and drop the rows and verify the name changes
#     And the user has added the following rows:
#       | Target Name  |
#       | Cells        |
#       | Nuclei       |
#       | Organelles   |
#     When the user drags and drops the row with "Cells" to the position of "Organelles"
#     Then the target "Cells" should be moved to the position of "Organelles"
#     And the target "Organelles" should be moved to the position of "Cells"