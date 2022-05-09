import { existingUser, url } from "../../support";

describe("Filtering between game types", () => {
  const { email, password } = existingUser;

  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
  });

  it("Should choose each game type", () => {
    cy.get(".sc-bBHHxi>button").each((button) => {
      cy.get(button).click();
      cy.get(button).click();
    });
  });

  it("Should choose all game types", () => {
    cy.get(".sc-bBHHxi>button").each((button) => {
      cy.get(button).click();
    });
  });
});