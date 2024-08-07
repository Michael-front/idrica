import { ROUTES_PATH } from "../../../src/postsManager/config/routes/routes";

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit(ROUTES_PATH.LOGIN);
  });

  it("should log in successfully with correct credentials via email", () => {
    cy.get('[class*="login__input"]').first().type("Sincere@april.biz");

    cy.get('[class*="login__input"]').last().type("1234");

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", ROUTES_PATH.HOME);

    cy.get('[class*="header"]').should("contain", "Bret");
  });

  it("should log in successfully with correct credentials via username", () => {
    cy.get('[class*="login__input"]').first().type("Bret");

    cy.get('[class*="login__input"]').last().type("1234");

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", ROUTES_PATH.HOME);

    cy.get('[class*="header"]').should("contain", "Bret");
  });

  it("should show error with incorrect credentials", () => {
    cy.get('[class*="login__input"]').first().type("wrongUsername");

    cy.get('[class*="login__input"]').last().type("wrongPassword");

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", ROUTES_PATH.LOGIN);
  });
});
