import { doLogin } from "support/util";
import { ROUTES_PATH } from "../../../src/postsManager/config/routes/routes";

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit(ROUTES_PATH.LOGIN);
  });

  it("should log in successfully with correct credentials via email", () => {
    doLogin("Sincere@april.biz", "1234");

    cy.url().should("include", ROUTES_PATH.HOME);

    cy.get('[class*="header"]').should("contain", "Bret");
  });

  it("should log in successfully with correct credentials via username", () => {
    doLogin("Bret", "1234");

    cy.url().should("include", ROUTES_PATH.HOME);

    cy.get('[class*="header"]').should("contain", "Bret");
  });

  it("should show error with incorrect credentials", () => {
    doLogin("wrogUserName", "wrongPassword");

    cy.url().should("include", ROUTES_PATH.LOGIN);
  });

  it("should log out successfully", () => {
    doLogin("Bret", "1234");

    cy.url().should("include", ROUTES_PATH.HOME);
    cy.get('[class*="header"]').should("contain", "Bret");

    cy.get('[class*="header__user-menu"]').click();
    cy.get('[class*="header__user-dropdown-menu"]').should("be.visible");

    cy.get('[data-testid="logout"]').click();

    cy.get('[class*="header"]').should("not.contain", "Bret");
    cy.get('[class*="header__login"]').should("be.visible");
  });
});
