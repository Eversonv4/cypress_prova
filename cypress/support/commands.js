// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add(
  "signup",
  (name, email, password, expectedStatus, expectedMessage) => {
    cy.intercept("POST", "**/user/create").as("register");

    cy.get("#name").type(name);
    cy.get("#email").type(email);
    cy.get("#password").type(password);

    cy.get(".sc-iJKOTD").click();

    cy.wait("@register").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(expectedStatus);
    });

    cy.contains(expectedMessage).should("be.visible");
  }
);

Cypress.Commands.add(
  "signin",
  (email, password, expectedStatus, expectedMessage) => {
    cy.intercept("POST", "**/login").as("login");

    cy.get("#email").type(email);
    cy.get("#password").type(password);

    cy.get(".sc-iJKOTD").click();

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(expectedStatus);
    });
    cy.contains(expectedMessage).should("be.visible");
  }
);

Cypress.Commands.add(
  "resetPassword",
  (email, expectedStatus, expectedMessage) => {
    cy.intercept("POST", "**/reset").as("reset");
    cy.get(".sc-bBHxTw").type(email);

    cy.get(".sc-iJKOTD").click();
    cy.wait("@reset").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(expectedStatus);
    });
    cy.contains(expectedMessage).should("be.visible");
  }
);