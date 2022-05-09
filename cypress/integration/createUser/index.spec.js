import { existingUser, url } from "../../support";

describe("Creating a user", () => {
  const { name, email, password } = existingUser;
  beforeEach(() => {
    cy.visit(`${url}/auth/register`);
  });

  it("Should register user", () => {
    cy.signup("naruto", "naruto@gmail.com", "123456", 200, "User registered! 👌");
  });

  it("Should not register a user that already exists", () => {
    cy.signup(
      name,
      email,
      password,
      400,
      "Request failed with status code 400"
    );
  });
});