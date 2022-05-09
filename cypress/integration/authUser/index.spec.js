import { existingUser, url } from "../../support/";

describe("Authenticate and logout", () => {
  const { email, password } = existingUser;
  beforeEach(() => {
    cy.visit(url);
  });

  it("Should not authenticate a user that doesn't exist", () => {
    cy.signin(
      "nobody@email.com",
      "999999",
      401,
      "Invalid email or password."
    );
  });

  it("Should sign in user and make a logout.", () => {
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(":nth-child(2) > .sc-crHmcD").click();
  });
});