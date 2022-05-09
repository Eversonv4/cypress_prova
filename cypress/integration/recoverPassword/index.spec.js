import { url } from "../../support";

describe("Reset Password", () => {
  beforeEach(() => {
    cy.visit(`${url}/auth/reset`);
  });

  it("Should not send link to user that doesn't exist", () => {
    cy.resetPassword(
      "sasuke@sasuke.com",
      404,
      "Request failed with status code 404"
    );
  });

  it("Should send link to existed user and update its password.", () => {
    cy.resetPassword("naruto@gmail.com", 200, "Link sent");

    cy.intercept("POST", "**/reset/**").as("resetToken");
    cy.get("#password").type("654321");

    cy.get(".sc-iJKOTD").click();
    cy.wait("@resetToken").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
    cy.get('.Toastify__toast-body > :nth-child(2)').contains("Password reset").should("be.visible");
  });
});