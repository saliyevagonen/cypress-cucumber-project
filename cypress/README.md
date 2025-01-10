# Cypress Cucumber Project

This project is a testing framework that combines Cypress and Cucumber for behavior-driven development (BDD) testing.

## Project Structure

- `cypress/`: Contains all Cypress tests.
- `cypress/api/`: Contains API tasks.
- `cypress/cypress-cucumber/`: Contains UI tasks (Problem One and Problem Two)
- `cypress/jenkins/`: Contains Jenkins task
- `cypress/support/`: Contains commands and custom utilities for testing.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/cypress-cucumber-project.git
   
2. Install dependencies
   ```bash
   npm install

3. Run tests
   ```bash
   npm run test
   or
   npm run test:headless
